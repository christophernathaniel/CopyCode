import "./titlebar.css";
import React, { Component } from "react";

class Titlebar extends Component {
  render() {
    return (
      <div className="titlebar">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Titlebar;
