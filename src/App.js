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
    const { activeSuggestion, bookmarks } = this.state;
    const { key } = event;
    const numBookmarksRendered = bookmarks.length;
    let suggestion = activeSuggestion;
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
      if (bookmarks[activeSuggestion].type === "bookmark") {
        chrome.tabs.update({
          url: bookmarks[activeSuggestion].url,
        });
      }
      if (bookmarks[activeSuggestion].type === "folder") {
        this.setState({
          bookmarks: bookmarks[activeSuggestion].children,
          searchStr: "",
        });
      }
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
    const { activeSuggestion, bookmarks, searchStr } = this.state;
    return (
      <div>
        <header>
          <h1>DogEar</h1>
        </header>
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
