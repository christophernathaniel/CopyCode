import React, { Component } from "react";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pxHeightValue: 200,
      pxWidthValue: props.pxWidthValue,
      pxMobileHeightValue: 200,
      pxMobileWidthValue: 200,
      organismName: "organism-name",
      aspectRatio: 1,
      itemCount: [1],
      unit: "px",
      isloop: false,
      iscolumn: false,
      formatter: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    if (isNaN(event.target.value) || event.target.value <= 1) {
      this.setState((state) => ({
        [event.target.id]: 1
      }));

      return true;
    }

    if (event.target.id) {
      this.setState((state) => ({
        [event.target.id]: parseInt(event.target.value, 10)
      }));
      return true;
    }
  }

  render() {
    return (
      <div className="Home">
        {" "}
        <label className="pxWidth">
          <span>Width Value</span>
          <input
            type="text"
            pattern="[0-9]*"
            id="pxWidthValue"
            onChange={this.handleInputChange}
            value={this.state.pxWidthValue}
            placeholder="Pixel Width"
          />
        </label>
      </div>
    );
  }
}

export default Menu;
