import React, { Component } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";

class ZeusCodeblock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organismName: this.props.organismName,
      stringData: this.props.stringData,
      importName: this.props.importName,
      fileName: this.props.fileName,
      renderLang: this.props.renderLang
    };
  }

  // Check if StringData updated
  componentDidUpdate(prevProps) {
    if (prevProps.stringData !== this.props.stringData) {
      this.setState({ stringData: this.props.stringData });
    }

    if (prevProps.organismName !== this.props.organismName) {
      this.setState({ organismName: this.props.organismName });
    }

    if (prevProps.importName !== this.props.importName) {
      this.setState({ importName: this.props.importName });
    }

    if (prevProps.fileName !== this.props.fileName) {
      this.setState({ fileName: this.props.fileName });
    }
  }

  render() {
    return (
      <>
        <div className="titleContainer">
          <div className="importName">{this.state.importName}</div>
          <div className="fileName">{this.state.fileName}</div>
        </div>
        <SyntaxHighlighter language={this.state.renderLang} style={hybrid}>
          {this.state.stringData}
        </SyntaxHighlighter>
      </>
    );
  }
}

export default ZeusCodeblock;
