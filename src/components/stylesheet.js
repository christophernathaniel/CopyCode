import React, { Component } from "react";
import ResponsiveUnit from "./generator_css/responsiveunit.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Stylesheet extends Component {
  render() {
    return (
      <div className="stylesheet">
        <Router>
          <Link to="/stylesheet/responsiveunit">Responsive Unit</Link>
          <Route
            exact
            path="/stylesheet/responsiveunit"
            component={ResponsiveUnit}
          />
        </Router>
      </div>
    );
  }
}

export default Stylesheet;
