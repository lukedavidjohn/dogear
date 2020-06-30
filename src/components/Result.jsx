import React, { Component } from "react";

class Result extends Component {
  render() {
    const { activeSuggestion, bookmark, idx } = this.props;
    const inputProps = {
      style: {
        "background-color": "#FFF",
      },
    };
    if (activeSuggestion === idx) {
      inputProps.style["background-color"] = "#D3D3D3";
    }
    return (
      <li key={idx} {...inputProps}>
        {bookmark.title}
      </li>
    );
  }
}

export default Result;
