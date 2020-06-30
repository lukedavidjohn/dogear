/*global chrome*/
import React, { Component } from "react";
import { getBookmarks } from "./utils/getBookmarks";

class App extends Component {
  state = {
    bookmarks: [],
  };
  componentDidMount() {
    getBookmarks((bookmarks) => {
      this.setState({
        bookmarks,
      });
      // chrome.runtime.sendMessage({ type: "getBookmarks", bookmarks });
    });
  }

  render() {
    const { bookmarks } = this.state;
    return (
      <div>
        {bookmarks.map((bookmark) => {
          return <li>{bookmark.title}</li>;
        })}
      </div>
    );
  }
}

export default App;
