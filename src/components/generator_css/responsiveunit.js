import "./responsiveunit.css";
import React, { Component } from "react";
import { Resizable, ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dedent from "dedent";
// import Menu from "./menu";

class ResponsiveUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      formatter: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleInputTextChange = this.handleInputTextChange.bind(this);

    this.handleArChange = this.handleArChange.bind(this);

    this.handleInputSubmit = this.handleSubmit.bind(this);

    this.handleResize = this.handleResize.bind(this);

    this.resizeHandle = this.resizeHandle.bind(this);

    this.handleCheckbox = this.handleCheckbox.bind(this);

    this.handleFormatterState = this.handleFormatterState.bind(this);
  }

  handleFormatterState() {
    this.setState((state) => ({ formatter: !this.state.formatter }));
  }

  handleInputTextChange(event) {
    this.setState((state) => ({
      [event.target.id]: event.target.value
    }));
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

  handleSubmit(event) {}

  handleCheckbox(event) {
    this.setState((state) => ({
      [event.target.id]: event.target.checked
    }));
  }

  handleArChange(event) {
    if (isNaN(event.target.value) || event.target.value <= 0) {
      this.setState((state) => ({
        [event.target.id]: 0
      }));
      return true;
    }

    this.setState((state) => ({
      [event.target.id]: event.target.value
    }));
  }

  handleResize(event, data) {
    if (data.size.width && data.size.height) {
      this.setState({
        pxWidthValue: parseInt(data.size.width, 10),
        pxHeightValue: parseInt(data.size.height, 10)
      });
    }
  }

  buildVanillaString() {
    return "Vanilla String";
  }

  buildZeusHtmlString(
    include = {
      organism: {
        name: this.state.organismName
      },
      loop: {
        status: this.state.isloop,
        start: "\n{% if loops %}",
        end: "\n{% endif %}",
        forstart: "\n{% for loop in loops %}",
        set: "\n{% set fields = loop.fields %}",
        forend: "\n{% endfor %}"
      },
      columns: {
        status: this.state.iscolumn,
        start: `\n<div class="wp-block-columns columns">`,
        end: `\n</div>`,
        singlestart: `\n <div class="wp-block column">`,
        singleend: `\n </div>`
      }
    }
  ) {
    let buildString = "";

    buildString += dedent(
      `
      ${(() => {
        return include.loop.status ? include.loop.start : "";
      })()} ${(() => {
        return include.columns.status ? include.columns.start : "";
      })()} ${(() => {
        return include.loop.status ? include.loop.forstart : "";
      })()} ${(() => {
        return include.loop.status ? include.loop.set : "";
      })()} ${(() => {
        return include.columns.status ? include.columns.singlestart : "";
      })()} 

    <div class="` +
        include.organism.name +
        `" data-type="organism">
      <div class="molecule-image">
        <div class="atom-image">

        </div>
      </div>
      <div class="inner">
        <div class="title">
          <span class="font font48 document-title-font"></span>
        </div>
        <div class="text">
          <span class="font font48 document-regular-font"></span>
        </div>
        <span class="atom-button">
          <a class="button" href="#"></a>
        </span>
      </div>
    </div>
      ${(() => {
        return include.columns.status ? include.columns.singleend : "";
      })()}${(() => {
          return include.loop.status ? include.loop.forend : "";
        })()} ${(() => {
          return include.columns.status ? include.columns.end : "";
        })()} ${(() => {
          return include.loop.status ? include.loop.end : "";
        })()} `
    );

    return buildString;
  }

  buildZeusCssString(
    include = {
      organism: {
        name: this.state.organismName
      }
    }
  ) {
    let buildString = "";

    // Module Start
    buildString += dedent(`.` + include.organism.name + ` {  `);
    buildString += `\n`;

    // Flex
    buildString += dedent(`
      display: flex; 
      justify-content: flex-start; 
      align-items: flex-start; 
    `);
    buildString += `\n\n`;

    // Responsive Units
    buildString += dedent(
      `responsiveUnit('Width', ` +
        this.state.pxWidthValue +
        `px, ` +
        this.state.pxWidthValue +
        `px, ` +
        this.state.pxWidthValue +
        `px);
        responsiveUnit('Height', ` +
        this.state.pxHeightValue +
        `px, ` +
        this.state.pxHeightValue +
        `px, ` +
        this.state.pxHeightValue +
        `px); `
    );
    buildString += `\n\n`;
    // Flex
    buildString += dedent(
      `
      @include sm-down() { 
        height: ` +
        this.state.pxHeightValue +
        `px;
        Width: ` +
        this.state.pxWidthValue +
        `px;
      }
    `
    );
    buildString += `\n\n`;

    // Link
    buildString += dedent(
      `
      a { 
      color: $blue;

      &:hover {
        color: $white;
      }
    }
    `
    );
    buildString += `\n`;
    buildString += dedent(`}`);

    return buildString;
  }

  buildZeusGutenbergString(
    include = {
      organism: {
        name: this.state.organismName
      }
    }
  ) {
    let buildString = "";
    buildString += dedent(
      `
    acf_register_block(
      array(
          'name' => '` +
        include.organism.name +
        `',
          'title' => __('* ` +
        include.organism.name +
        `'),
          'description' => __('An Example Custom Block'),
          'render_callback' => [$this, 'block_render_callback'],
          'category' => 'page-blocks',
          'icon' => 'admin-comments',
          'keywords' => array('custom', 'block'),
      )
  );`
    );
    return buildString;
  }

  resizeHandle(event, data) {}

  render() {
    const zeusCssString = this.buildZeusCssString();
    const zeusHtmlString = this.buildZeusHtmlString();
    const zeusGutenbergRegister = this.buildZeusGutenbergString();
    return (
      <div>
        <div className="menuButton" onClick={this.handleFormatterState}>
          Click State
        </div>
        {this.state.formatter ? (
          <div className="form-container">
            <form className="input">
              <label className="organismName">
                <span onClick={() => alert("hello")}>organismName:</span>
                <input
                  type="text"
                  id="organismName"
                  onChange={this.handleInputTextChange}
                  value={this.state.organismName}
                  placeholder="Organism Name"
                />
                {this.state.unit}
              </label>
              <label className="pxHeight">
                <span onClick={() => alert("hello")}>height:</span>
                <input
                  type="text"
                  pattern="[0-9]*"
                  id="pxHeightValue"
                  onChange={this.handleInputChange}
                  value={this.state.pxHeightValue}
                  placeholder="Pixel Height"
                />
                {this.state.unit}
              </label>
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

              <label className="aspectRatio">
                <span>Aspect Ratio</span>
                <input
                  type="text"
                  id="aspectRatio"
                  onChange={this.handleArChange}
                  value={this.state.aspectRatio}
                  placeholder="Aspect Ratio"
                />
              </label>
              <label className="isLoop">
                <span>Is Loop</span>
                <input
                  type="checkbox"
                  id="isloop"
                  onChange={this.handleCheckbox}
                  checked={this.state.isloop}
                  placeholder="isLoop"
                />
              </label>
              <label className="isColumn">
                <span>Is Column</span>
                <input
                  type="checkbox"
                  id="iscolumn"
                  onChange={this.handleCheckbox}
                  checked={this.state.iscolumn}
                  value={this.state.iscolumn}
                  placeholder="isColumn"
                />
              </label>
            </form>
          </div>
        ) : null}

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
        <div className="results-container">
          <div className="output">{this.state.generated}</div>
          <Tabs>
            <TabList>
              <Tab>Zeus</Tab>
              <Tab>Wordpress</Tab>
              <Tab>Vanilla</Tab>
            </TabList>
            <TabPanel>
              <div className="fileName">_{this.state.organismName}.scss</div>
              <SyntaxHighlighter language="css" style={hybrid}>
                {zeusCssString}
              </SyntaxHighlighter>
              <div className="fileName">{this.state.organismName}.twig</div>
              <SyntaxHighlighter language="javascript" style={hybrid}>
                {zeusHtmlString}
              </SyntaxHighlighter>
              <div className="fileName">{this.state.organismName}.php</div>
              <div className="fileName">Gutenberg Component</div>
              <SyntaxHighlighter language="php" style={hybrid}>
                {zeusGutenbergRegister}
              </SyntaxHighlighter>
            </TabPanel>
            <TabPanel>Wordpress</TabPanel>
            <TabPanel>
              <pre>
                <code>height: 200px;</code>
                <code>width: 200px;</code>
              </pre>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ResponsiveUnit;
