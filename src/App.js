import "./styles.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// import Stylesheet from "./components/stylesheet.js";
import ResponsiveUnit from "./components/responsiveunit.js";
import Titlebar from "./components/titlebar.js";

class App extends Component {
  // State
  constructor(props) {
    super(props);

    this.state = {
      title: "this is title",
      settings: {
        pxHeightValue: 200,
        pxWidthValue: 200,
        pxMobileHeightValue: 200,
        pxMobileWidthValue: 200,
        organismName: "organism-name",
        aspectRatio: 1,
        itemCount: [1],
        unit: "px",
        isloop: false,
        iscolumn: false,
        titlesize: 50,
        fontsize: 18,
        hassubtitle: true,
        hastitle: true,
        hastext: true,
        hasform: false,
        hasimage: true,
        hasimagetextoverlay: false,
        formatter: false
      }
    };
  }

  changeTitle = () => {
    this.setState((state) => ({ title: "changed" }));
  };

  render() {
    return (
      <div className="App">
        <Titlebar title={this.state.title} />
        {/* <Link to="/">Home</Link>
        <Link to="/stylesheet">Stylesheets</Link>
        <Link to="/script">Scripts</Link>
        <Route exact path="/" component={Home} />
        <Route exact path="/stylesheet" component={Stylesheet} />
        <Route exact path="/script" component={Script} /> */}
        <ResponsiveUnit settings={this.state.settings} />
      </div>
    );
  }
}

export default App;
