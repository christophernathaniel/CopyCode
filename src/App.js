import "./styles.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./components/home.js";
import Stylesheet from "./components/stylesheet.js";
import Titlebar from "./components/titlebar.js";
import Script from "./components/script.js";

class App extends Component {
  // State
  constructor(props) {
    super(props);

    this.state = {
      title: "this is title"
    };
  }

  changeTitle = () => {
    this.setState((state) => ({ title: "changed" }));
  };

  render() {
    return (
      <div className="App">
        <Titlebar title={this.state.title} />
        <Link to="/">Home</Link>
        <Link to="/stylesheet">Stylesheets</Link>
        <Link to="/script">Scripts</Link>
        <Route exact path="/" component={Home} />
        <Route exact path="/stylesheet" component={Stylesheet} />
        <Route exact path="/script" component={Script} />
      </div>
    );
  }
}

export default App;
