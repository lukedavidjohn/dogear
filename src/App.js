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
    });
  };

  componentDidMount() {
    getBookmarks((bookmarks) => {
      // sendMessage is for debugging
      // chrome.runtime.sendMessage({ type: "getBookmarks", bookmarks });
      this.setState({
        bookmarks,
        bookmarksOnMount: bookmarks,
      });
    });
  }

  render() {
    const { filterOnChange } = this;
    const { activeSuggestion, bookmarks } = this.state;
    return (
      <div>
        <header>
          <h1>DogEar</h1>
        </header>
        <SearchResults
          activeSuggestion={activeSuggestion}
          bookmarks={bookmarks}
          filterOnChange={filterOnChange}
        />
      </div>
    );
  }
}

export default App;
