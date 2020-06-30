/*global chrome*/
import React, { Component } from "react";
import { getBookmarks } from "./utils/getBookmarks";
import SearchResults from "./components/SearchResults";

class App extends Component {
  state = {
    activeSuggestion: 0,
    bookmarks: [],
  };
  componentDidMount() {
    getBookmarks((bookmarks) => {
      // sendMessage is for debugging
      // chrome.runtime.sendMessage({ type: "getBookmarks", bookmarks });
      this.setState({
        bookmarks,
      });
    });
  }

  render() {
    const { activeSuggestion, bookmarks } = this.state;
    return (
      <div>
        <header>
          <h1>DogEar</h1>
        </header>
        <SearchResults
          activeSuggestion={activeSuggestion}
          bookmarks={bookmarks}
        />
      </div>
    );
  }
}

export default App;
