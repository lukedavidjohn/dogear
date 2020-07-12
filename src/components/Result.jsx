import React, { Component } from "react";
import { FaFolder } from "react-icons/fa";

class Result extends Component {
  render() {
    const { activeSuggestion, bookmark, idx } = this.props;
    const { parent, title, type, url } = bookmark;
    let displayName = title;
    if (parent) {
      displayName = `${parent} / ${title}`;
    }
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
        {type === "folder" ? (
          <FaFolder />
        ) : (
          <img
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}`}
          />
        )}
        {" " + displayName}
      </li>
    );
  }
}

export default Result;
