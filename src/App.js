/*global chrome*/
import React, { Component } from "react";
import { getBookmarks } from "./utils/getBookmarks";
import { searchFilter } from "./utils/searchFilter";
import SearchResults from "./components/SearchResults";
import styled from "styled-components";

const Container = styled.div`
  width: 400px;
`;

class App extends Component {
  state = {
    activeSuggestion: 0,
    bookmarks: [],
    bookmarksOnMount: [],
    folderArr: ["."],
    searchStr: null,
  };

  filterOnChange = (event) => {
    const { value } = event.target;
    const { bookmarksOnMount } = this.state;
    const filteredBookmarks = searchFilter(bookmarksOnMount, value);
    this.setState({
      bookmarks: filteredBookmarks,
      searchStr: value,
    });
  };

  handleKeyStrokes = (event) => {
    const {
      activeSuggestion,
      bookmarks,
      // bookmarksOnMount,
      folderArr,
      searchStr,
    } = this.state;
    const { key } = event;
    const bookmark = bookmarks[activeSuggestion];
    const numBookmarksRendered = bookmarks.length;
    let suggestion = activeSuggestion;
    const newFolderArr = folderArr;
    if (key === "ArrowDown") {
      suggestion++;
      if (suggestion === numBookmarksRendered) {
        suggestion = 0;
      }
      this.setState({
        activeSuggestion: suggestion,
      });
    }
    if (key === "ArrowUp") {
      suggestion--;
      if (suggestion < 0) {
        suggestion = numBookmarksRendered - 1;
      }
      this.setState({
        activeSuggestion: suggestion,
      });
    }
    if (key === "Enter") {
      if (bookmark.type === "bookmark") {
        chrome.tabs.update({
          url: bookmark.url,
        });
      }
      if (bookmark.type === "folder") {
        newFolderArr.push(bookmark.title);
        this.setState({
          activeSuggestion: 0,
          bookmarks: Object.values(bookmark.children),
          folderArr: newFolderArr,
          searchStr: "",
        });
      }
    }
    if (key === "Backspace" && searchStr === "") {
      if (newFolderArr.length > 1) {
        newFolderArr.pop();
      }
      this.setState({
        // activeSuggestion: 0,
        // bookmarks: bookmarks[bookmark.parent],
        folderArr: newFolderArr,
        // searchStr: "",
      });
    }
  };

  componentDidMount() {
    getBookmarks((displayTree) => {
      const bookmarks = Object.values(displayTree);
      this.setState({
        bookmarks,
        bookmarksOnMount: bookmarks,
      });
    });
  }

  render() {
    const { filterOnChange, handleKeyStrokes } = this;
    const { activeSuggestion, bookmarks, folderArr, searchStr } = this.state;
    return (
      <Container>
        <header>
          <h1>DogEar</h1>
        </header>
        <h2>{folderArr.join("/")}</h2>
        <SearchResults
          activeSuggestion={activeSuggestion}
          bookmarks={bookmarks}
          filterOnChange={filterOnChange}
          handleKeyStrokes={handleKeyStrokes}
          searchStr={searchStr}
        />
      </Container>
    );
  }
}

export default App;
