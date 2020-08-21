/*global chrome*/
import React, { Component } from "react";
import { getBookmarkTree } from "./utils/getBookmarkTree";
import { searchFilter } from "./utils/searchFilter";
import SearchResults from "./components/SearchResults";
import styled from "styled-components";
import GlobalFonts from "./fonts/fonts";
import { orderBy } from "./utils/orderBy";
import _ from "lodash";

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
    inFolder: false,
    searchStr: null,
  };

  filterOnChange = (event) => {
    const { value } = event.target;
    const { bookmarkTreeOnRender, bookmarkTreeOnMount, inFolder } = this.state;
    let bookmarksToSearch;
    if (inFolder === true) {
      bookmarksToSearch = bookmarkTreeOnRender;
    } else {
      bookmarksToSearch = bookmarkTreeOnMount;
    }
    const filteredBookmarkTree = searchFilter(bookmarksToSearch, value);
    const orderedFilteredBookmarkTree = orderBy(filteredBookmarkTree);
    this.setState({
      bookmarkTreeOnRender: orderedFilteredBookmarkTree,
      searchStr: value,
    });
  };

  handleKeyDowns = (event) => {
    const {
      activeSuggestion,
      bookmarkTreeOnRender,
      bookmarkTreeOnMount,
      folderArr,
      inFolder,
      searchStr,
    } = this.state;
    const { key, ctrlKey, metaKey } = event;
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
        if (metaKey || ctrlKey) {
          chrome.tabs.create({
            url: bookmarkItem.url,
          });
        } else {
          chrome.tabs.update({
            url: bookmarkItem.url,
          });
        }
        window.close();
      }
      if (bookmarkItem.type === "folder") {
        newFolderArr.push(bookmarkItem.title);
        this.setState({
          activeSuggestion: 0,
          bookmarkTreeOnRender: orderBy(bookmarkItem.children),
          folderArr: newFolderArr,
          inFolder: true,
          searchStr: "",
        });
      }
    }
    // if (key === "Backspace" && searchStr.length === 1) {
    //   const thing = _.filter(bookmarkTreeOnMount, { title });
    //   chrome.runtime.sendMessage(thing);
    // }
    if (key === "Backspace" && searchStr === "") {
      let parentBookmarks;
      let toggleInFolder = inFolder;
      if (newFolderArr.length === 1) {
        return null;
      } else if (newFolderArr.length === 2) {
        newFolderArr.pop();
        parentBookmarks = bookmarkTreeOnMount;
        toggleInFolder = false;
      } else if (newFolderArr.length > 2) {
        newFolderArr.pop();
        parentBookmarks =
          bookmarkTreeOnMount[newFolderArr[newFolderArr.length - 1]].children;
        toggleInFolder = true;
      }
      this.setState({
        activeSuggestion: 0,
        bookmarkTreeOnRender: parentBookmarks,
        folderArr: newFolderArr,
        inFolder: toggleInFolder,
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
