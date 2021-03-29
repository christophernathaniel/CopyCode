import React, { Component } from "react";

class zeusPhp extends Component {
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

export default zeusPhp;
