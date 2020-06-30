/*global chrome*/
import React, { Component } from "react";
import { getBookmarks } from "./utils/getBookmarks";
import SearchResults from "./components/SearchResults";

class App extends Component {
  state = {
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
    const { bookmarks } = this.state;
    return (
      <div>
        <header>
          <h1>DogEar</h1>
        </header>
        <SearchResults bookmarks={bookmarks} />
      </div>
    );
  }
}

export default App;
