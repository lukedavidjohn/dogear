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
      bookmarkTree,
      filterOnChange,
      handleKeyDowns,
      searchStr,
    } = this.props;
    return (
      <div>
        <Input
          autoFocus
          onChange={filterOnChange}
          onKeyDown={handleKeyDowns}
          placeholder="DogEar Search"
          type="text"
          value={searchStr}
        ></Input>
        <ul style={{ "list-style-type": "none" }}>
          {searchStr === null
            ? []
            : bookmarkTree.map((bookmark, idx) => {
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
