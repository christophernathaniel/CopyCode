import React, { Component } from "react";

class ZeusCss extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organismName: this.props.organismName
    };
  }

  render() {
    return (
      <div className="titleContainer">
        <div className="importName">
          @import 'organisms/{this.state.organismName}';
        </div>
        <div className="fileName">_{this.state.organismName}.scss</div>
      </div>
    );
  }
}

export default ZeusCss;
