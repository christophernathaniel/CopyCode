import "./tile.css";
import React, { Component } from "react";
import FavouriteScroller from "./favouritescroller.js";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        This is home
        <br />
        <FavouriteScroller />
      </div>
    );
  }
}

export default Home;
