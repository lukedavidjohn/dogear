/*global chrome*/
import React, { Component } from "react";
import { getBookmarks } from "./utils/getBookmarks";
import { searchFilter } from "./utils/searchFilter";
import SearchResults from "./components/SearchResults";
import styled from "styled-components";
import GlobalFonts from "./fonts/fonts";

const Container = styled.div`
  width: 400px;
  font-family: "Quicksand";
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
    const filteredBookmarks = searchFilter(
      Object.values(bookmarksOnMount),
      value
    );
    this.setState({
      bookmarks: filteredBookmarks,
      searchStr: value,
    });
  };

  handleKeyDowns = (event) => {
    const {
      activeSuggestion,
      bookmarks,
      bookmarksOnMount,
      folderArr,
      searchStr,
    } = this.state;
    const { key, metaKey } = event;
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
        if (metaKey) {
          chrome.tabs.create({
            url: bookmark.url,
          });
        } else {
          chrome.tabs.update({
            url: bookmark.url,
          });
        }
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
      let parentBookmarks;
      const parentFolder = newFolderArr[newFolderArr.length - 1];
      if (newFolderArr.length === 1) {
        return null;
      } else if (newFolderArr.length === 2) {
        newFolderArr.pop();
        parentBookmarks = Object.values(bookmarksOnMount);
      } else if (newFolderArr.length > 2) {
        newFolderArr.pop();
        parentBookmarks = Object.values(
          bookmarksOnMount[newFolderArr[newFolderArr.length - 1]].children
        );
      }
      this.setState({
        // activeSuggestion: 0,
        bookmarks: parentBookmarks,
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
        bookmarksOnMount: displayTree,
      });
    });
  }

  render() {
    const { filterOnChange, handleKeyDowns } = this;
    const { activeSuggestion, bookmarks, folderArr, searchStr } = this.state;
    return (
      <div>
        <GlobalFonts />
        <Container>
          <header>
            <h1>DogEar</h1>
          </header>
          {folderArr.length > 1 ? <h2>{folderArr.join("/")}</h2> : null}
          <SearchResults
            activeSuggestion={activeSuggestion}
            bookmarks={bookmarks}
            filterOnChange={filterOnChange}
            handleKeyDowns={handleKeyDowns}
            searchStr={searchStr}
          />
        </Container>
      </div>
    );
  }
}

export default App;
