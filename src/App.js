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
    // chrome.runtime.sendMessage({
    //   type: "filterOnChange",
    //   filteredBookmarks,
    // });
    this.setState({
      bookmarks: filteredBookmarks,
      searchStr: value,
    });
  };

  componentDidMount() {
    getBookmarks((displayTree) => {
      // sendMessage is for debugging
      chrome.runtime.sendMessage({
        type: "getBookmarks",
        displayTree,
      });
      this.setState({
        bookmarks: displayTree,
        bookmarksOnMount: displayTree,
      });
    });
  }

  render() {
    const { filterOnChange } = this;
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
          searchStr={searchStr}
        />
      </div>
    );
  }
}

export default App;
