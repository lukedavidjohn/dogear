/*global chrome*/
import React, { Component } from "react";
import Result from "./Result";
import styled from "styled-components";

const Input = styled.input`
  width: 380px;
`;

class SearchResults extends Component {
  render() {
    const {
      activeSuggestion,
      bookmarks,
      filterOnChange,
      handleKeyStrokes,
      searchStr,
    } = this.props;
    return (
      <div>
        <Input
          autoFocus
          onChange={filterOnChange}
          onKeyDown={handleKeyStrokes}
          placeholder="DogEar Search"
          type="text"
          value={searchStr}
        ></Input>
        <ul style={{ "list-style-type": "none" }}>
          {searchStr === null
            ? []
            : bookmarks.map((bookmark, idx) => {
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
