import "./tile.css";
import React, { Component } from "react";

class Tile extends Component {
  render() {
    return (
      <div className="tile">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default Tile;
