/*global chrome*/
import React, { Component } from "react";
import { getBookmarks } from "./utils/getBookmarks";

class App extends Component {
  componentDidMount() {
    getBookmarks((bookmarks) => {
      chrome.runtime.sendMessage({ type: "getBookmarks", bookmarks });
    });
  }

  render() {
    return <div>HELLO</div>;
  }
}

export default App;
