/*global chrome*/
import React, { Component } from "react";
import { getBookmarks } from "./utils/getBookmarks";
import { searchFilter } from "./utils/searchFilter";
import SearchResults from "./components/SearchResults";

class App extends Component {
  state = {
    activeSuggestion: 0,
    bookmarks: [],
    bookmarksOnMount: [],
    folder: null,
    searchStr: null,
  };

  filterOnChange = (event) => {
    const { value } = event.target;
    const { bookmarksOnMount } = this.state;
    const filteredBookmarks = searchFilter(bookmarksOnMount, value);
    this.setState({
      bookmarks: filteredBookmarks,
      searchStr: value,
    });
  };

  handleKeyStrokes = (event) => {
    const { activeSuggestion, bookmarks, searchStr } = this.state;
    const { key } = event;
    const bookmark = bookmarks[activeSuggestion];
    const numBookmarksRendered = bookmarks.length;
    let suggestion = activeSuggestion;
    chrome.runtime.sendMessage({
      type: "onKeyDown",
      key,
    });
    if (key === "ArrowDown") {
      suggestion++;
      if (suggestion === numBookmarksRendered) {
        suggestion = 0;
      }
      this.setState({
        activeSuggestion: suggestion,
      });
    }
    if (key === "ArrowUp") {
      suggestion--;
      if (suggestion < 0) {
        suggestion = numBookmarksRendered - 1;
      }
      this.setState({
        activeSuggestion: suggestion,
      });
    }
    if (key === "Enter") {
      if (bookmark.type === "bookmark") {
        chrome.tabs.update({
          url: bookmark.url,
        });
      }
      if (bookmark.type === "folder") {
        this.setState({
          bookmarks: bookmark.children,
          folder: bookmark.title,
          searchStr: "",
        });
      }
    }
    if (key === "Backspace" && searchStr === "") {
      getBookmarks((displayTree) => {
        this.setState({
          bookmarks: displayTree,
        });
      });
    }
  };

  componentDidMount() {
    getBookmarks((displayTree) => {
      chrome.runtime.sendMessage({
        type: "getBookmarks",
      });
      this.setState({
        bookmarks: displayTree,
        bookmarksOnMount: displayTree,
      });
    });
  }

  render() {
    const { filterOnChange, handleKeyStrokes } = this;
    const { activeSuggestion, bookmarks, folder, searchStr } = this.state;
    return (
      <div>
        <header>
          <h1>DogEar</h1>
        </header>
        {folder ? <h2>{folder}</h2> : null}
        <SearchResults
          activeSuggestion={activeSuggestion}
          bookmarks={bookmarks}
          filterOnChange={filterOnChange}
          handleKeyStrokes={handleKeyStrokes}
          searchStr={searchStr}
        />
      </div>
    );
  }
}

export default App;
