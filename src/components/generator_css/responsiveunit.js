import "./responsiveunit.css";
import React, { Component } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import ContentEditable from "react-contenteditable";

class ResponsiveUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pxHeightValue: 200,
      pxWidthValue: 200,
      aspectRatio: 1,
      itemCount: [1],
      unit: "px"
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleResize = this.handleResize.bind(this);

    this.resizeHandle = this.resizeHandle.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "pxHeight") {
      this.setState({
        pxHeightValue: parseInt(event.target.value, 10)
      });
    }

    if (event.target.id === "pxWidth") {
      this.setState((state, props) => ({
        pxWidthValue: parseInt(event.target.value, 10)
      }));
    }

    if (event.target.id === "aspectRatio") {
      this.setState({
        aspectRatio: parseInt(event.target.value, 10)
      });
    }

    if (event.target.id === "aspectRatio") {
      this.setState({ aspectRatio: parseInt(event.target.value, 10) });
    }
  }

  handleSubmit(event) {}

  handleResize(event, data) {
    console.log(data.size.width);
    if (data.size.width && data.size.height) {
      this.setState({
        pxWidthValue: parseInt(data.size.width, 10),
        pxHeightValue: parseInt(data.size.height, 10)
      });
    }
  }

  resizeHandle(event, data) {
    console.log(event);
  }

  render() {
    return (
      <div>
        {this.state.itemCount.map((item) => {
          return (
            <ResizableBox
              id={item}
              key="{item}"
              width={this.state.pxWidthValue}
              height={this.state.pxHeightValue}
              onResize={this.handleResize}
            >
              <div>
                {this.state.pxWidthValue}
                {this.state.unit} x {this.state.pxHeightValue}
                {this.state.unit}
              </div>
            </ResizableBox>
          );
        })}
        {this.state.height}
        <form className="input">
          <label className="pxHeight">
            <span onClick={() => alert("hello")}>height:</span>
            <input
              type="text"
              pattern="[0-9]*"
              id="pxHeight"
              onChange={this.handleChange}
              value={this.state.pxHeightValue}
              placeholder="Pixel Height"
            />
            {/* <ContentEditable
              id="pxHeight"
              innerRef={this.contentEditable}
              html={this.state.pxHeightValue} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName="article" // Use a custom HTML tag (uses a div by default)
            /> */}
            {this.state.unit}
          </label>

          <label className="pxWidth">
            <span>Width Value</span>
            <input
              type="text"
              pattern="[0-9]*"
              id="pxWidth"
              onChange={this.handleChange}
              value={this.state.pxWidthValue}
              placeholder="Pixel Width"
            />
          </label>

          <label className="aspectRatio">
            <span>Aspect Ratio</span>
            <input
              type="text"
              pattern="[0-9]*"
              id="aspectRatio"
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
