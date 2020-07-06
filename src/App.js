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
    searchStr: "",
  };

  filterOnChange = (event) => {
    const { value } = event.target;
    const { bookmarksOnMount } = this.state;
    const filteredBookmarks = searchFilter(bookmarksOnMount, value);
    chrome.runtime.sendMessage({
      type: "filterOnChange",
    });
    this.setState({
      bookmarks: filteredBookmarks,
      searchStr: value,
    });
  };

  highlightOnKeyDown = (event) => {
    const { activeSuggestion, bookmarks } = this.state;
    const { key } = event;
    const numBookmarksRendered = bookmarks.length;
    let suggestion = activeSuggestion;
    // chrome.runtime.sendMessage({
    //   type: "onKeyDown",
    //   key,
    // });
    if (event.key === "ArrowDown") {
      suggestion++;
      if (suggestion === numBookmarksRendered) {
        suggestion = 0;
      }
    }
    if (event.key === "ArrowUp") {
      suggestion--;
      if (suggestion < 0) {
        suggestion = numBookmarksRendered - 1;
      }
    }
    this.setState({
      activeSuggestion: suggestion,
    });
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
    const { filterOnChange, highlightOnKeyDown } = this;
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
          highlightOnKeyDown={highlightOnKeyDown}
          searchStr={searchStr}
        />
      </div>
    );
  }
}

export default App;
