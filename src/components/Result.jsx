import React, { Component } from "react";

class Result extends Component {
  render() {
    const { activeSuggestion, bookmark, idx } = this.props;
    const { parent, title } = bookmark;
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
        {displayName}
      </li>
    );
  }
}

export default Result;
