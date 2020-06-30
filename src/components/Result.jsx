import React, { Component } from "react";

class Result extends Component {
  state = {
    color: "#000",
  };
  render() {
    const { bookmark, idx } = this.props;
    return <li key={idx}>{bookmark.title}</li>;
  }
}

export default Result;
