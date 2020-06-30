/*global chrome*/
import React, { Component } from "react";
import Result from "./Result";

class SearchResults extends Component {
  render() {
    const { bookmarks } = this.props;
    return (
      <div>
        <input></input>
        <ul style={{ "list-style-type": "none" }}>
          {bookmarks.map((bookmark, idx) => {
            return <Result bookmark={bookmark} idx={idx} />;
          })}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
