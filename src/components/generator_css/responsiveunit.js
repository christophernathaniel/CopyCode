import "./responsiveunit.css";
import React, { Component } from "react";

class ResponsiveUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pxHeightValue: "",
      pxWidthValue: "",
      aspectRatio: "",
      newHeight: 0,
      newWidth: 0,
      generated: ""
    };

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "pxHeight") {
      this.setState({
        pxHeightValue: event.target.value,
        generated:
          this.state.aspectRatio /
          (this.state.pxWidthValue * event.target.value)
      });
    }

    if (event.target.id === "pxWidth") {
      this.setState({
        pxWidthValue: event.target.value,
        generated: event.target.value * this.state.pxHeightValue
      });
    }

    if (event.target.id === "aspectRatio") {
      this.setState({
        aspectRatio: event.target.value,
        generated: event.target.value * this.state.pxHeightValue
      });
    }

    if (event.target.id === "aspectRatio") {
      this.setState({ aspectRatio: event.target.value });
    }
  }

  handleSubmit(event) {}

  render() {
    return (
      <div>
        <form className="input">
          <label className="pxHeight">
            <span>Height Value</span>
            <input
              id="pxHeight"
              type="text"
              onChange={this.handleChange}
              value={this.state.pxHeightValue}
              placeholder="Pixel Height"
            />
          </label>

          <label className="pxWidth">
            <span>Width Value</span>
            <input
              id="pxWidth"
              type="text"
              onChange={this.handleChange}
              value={this.state.pxWidthValue}
              placeholder="Pixel Width"
            />
          </label>

          <label className="aspectRatio">
            <span>Aspect Ratio</span>
            <input
              id="aspectRatio"
              type="text"
              onChange={this.handleChange}
              value={this.state.aspectRatio}
              placeholder="Aspect Ratio"
            />
          </label>
        </form>
        <div className="output">{this.state.generated}</div>
      </div>
    );
  }
}

export default ResponsiveUnit;
