/*global chrome*/
import React, { Component } from "react";
import { getBookmarkTree } from "./utils/getBookmarkTree";
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
    bookmarkTreeOnRender: [],
    bookmarkTreeOnMount: [],
    folderArr: ["."],
    searchStr: null,
  };

  filterOnChange = (event) => {
    const { value } = event.target;
    const { bookmarkTreeOnMount } = this.state;
    const filteredBookmarkTree = searchFilter(bookmarkTreeOnMount, value);
    this.setState({
      bookmarkTreeOnRender: filteredBookmarkTree,
      searchStr: value,
    });
  };

  handleKeyDowns = (event) => {
    const {
      activeSuggestion,
      bookmarkTreeOnRender,
      bookmarkTreeOnMount,
      folderArr,
      searchStr,
    } = this.state;
    const { key, metaKey } = event;
    const bookmarkItem = bookmarkTreeOnRender[activeSuggestion];
    const numBookmarkItemsRendered = bookmarkTreeOnRender.length;
    let suggestion = activeSuggestion;
    const newFolderArr = folderArr;
    if (key === "ArrowDown") {
      suggestion++;
      if (suggestion === numBookmarkItemsRendered) {
        suggestion = 0;
      }
      this.setState({
        activeSuggestion: suggestion,
      });
    }
    if (key === "ArrowUp") {
      suggestion--;
      if (suggestion < 0) {
        suggestion = numBookmarkItemsRendered - 1;
      }
      this.setState({
        activeSuggestion: suggestion,
      });
    }
    if (key === "Enter") {
      if (bookmarkItem.type === "bookmark") {
        if (metaKey) {
          chrome.tabs.create({
            url: bookmarkItem.url,
          });
        } else {
          chrome.tabs.update({
            url: bookmarkItem.url,
          });
        }
      }
      if (bookmarkItem.type === "folder") {
        newFolderArr.push(bookmarkItem.title);
        this.setState({
          activeSuggestion: 0,
          bookmarkTreeOnRender: bookmarkItem.children,
          folderArr: newFolderArr,
          searchStr: "",
        });
      }
    }
    if (key === "Backspace" && searchStr === "") {
      let parentBookmarks;
      if (newFolderArr.length === 1) {
        return null;
      } else if (newFolderArr.length === 2) {
        newFolderArr.pop();
        parentBookmarks = bookmarkTreeOnMount;
      } else if (newFolderArr.length > 2) {
        newFolderArr.pop();
        parentBookmarks =
          bookmarkTreeOnMount[newFolderArr[newFolderArr.length - 1]].children;
      }
      this.setState({
        activeSuggestion: 0,
        bookmarkTreeOnRender: parentBookmarks,
        folderArr: newFolderArr,
        searchStr: "",
      });
    }
  };

  componentDidMount() {
    getBookmarkTree((bookmarkTree) => {
      this.setState({
        bookmarkTreeOnRender: bookmarkTree,
        bookmarkTreeOnMount: bookmarkTree,
      });
    });
  }

  render() {
    const { filterOnChange, handleKeyDowns } = this;
    const {
      activeSuggestion,
      bookmarkTreeOnRender,
      folderArr,
      searchStr,
    } = this.state;
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
            bookmarkTree={bookmarkTreeOnRender}
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
