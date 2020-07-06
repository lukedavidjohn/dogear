/*global chrome*/
import React, { Component } from "react";
import Result from "./Result";

class SearchResults extends Component {
  render() {
    const { activeSuggestion, bookmarks, filterOnChange } = this.props;
    return (
      <div>
        <input
          autoFocus
          onChange={filterOnChange}
          placeholder="DogEar Search"
          type="text"
        ></input>
        <ul style={{ "list-style-type": "none" }}>
          {bookmarks.map((bookmark, idx) => {
            return (
              <Result
                activeSuggestion={activeSuggestion}
                bookmark={bookmark}
                idx={idx}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
