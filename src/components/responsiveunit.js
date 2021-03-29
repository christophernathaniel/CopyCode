import "./responsiveunit.css";
import React, { Component } from "react";

import ZeusCss from "./zeus/zeusCss.js";
import ZeusJs from "./zeus/zeusJs.js";
import ZeusTimber from "./zeus/zeusTimber.js";
import ZeusPhp from "./zeus/zeusPhp.js";

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

    this.state = this.props.settings;
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
      },
      button: {
        status: this.state.hasbutton,
        // code: `<span class="atom-button">
        //     <a class="button" href="#"></a>
        // </span>`
        code: `{% include 'atoms/button.twig' %}`
      },
      title: {
        status: this.state.hastitle,
        code:
          `{% include 'atoms/text.twig' with { 'font' : 'font` +
          this.state.titlesize +
          ` document-title-font', 'content' : 'Title Text' } %}`
      },
      text: {
        status: this.state.hastext,
        code:
          `{% include 'atoms/text.twig' with { 'font' : 'font` +
          this.state.fontsize +
          ` document-text-font', 'content' : 'Content Text' } %}`
      },
      image: {
        status: this.state.hasimage,
        code: `{% include 'atoms/image.twig' %}`
      },
      form: {
        status: this.state.hasform,
        code: `{% include "/atoms/gform.twig"  %}`
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
        " {{ classList }}" +
        `" data-type="organism"  data-template="` +
        include.organism.name +
        `.twig">
        ${(() => {
          return include.image.status ? include.image.code : "";
        })()}
        ${(() => {
          return include.form.status ? include.form.code : "";
        })()}
        <div class="inner">
        ${(() => {
          return include.title.status ? include.title.code : "";
        })()}
        ${(() => {
          return include.text.status ? include.text.code : "";
        })()}
        ${(() => {
          return include.button.status ? include.button.code : "";
        })()}
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
      },
      button: {
        status: this.state.hasbutton,
        code: `
        a { 
          color: $blue;
        
          &:hover {
            color: $white;
          }
        }`
      },
      hasimagetextoverlay: {
        status: this.state.hasimagetextoverlay,
        code: `
        .text-overlay {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
        }`,
        organismCode: `position: relative;`
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

    buildString += `\n`;

    buildString += dedent(`
    ${(() => {
      return include.hasimagetextoverlay.status
        ? include.hasimagetextoverlay.organismCode
        : "";
    })()} 
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
        `px); 
       `
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
      ${(() => {
        return include.hasimagetextoverlay.status
          ? include.hasimagetextoverlay.code
          : "";
      })()} 
    `
    );

    buildString += `\n\n`;

    // Link
    buildString += dedent(
      `
      ${(() => {
        return include.button.status ? include.button.code : "";
      })()} 
    `
    );
    buildString += `\n`;
    buildString += dedent(`}`);

    return buildString;
  }

  buildZeusPhpString(
    include = {
      organism: {
        name: this.state.organismName
      },
      image: {
        status: this.state.hasimage,
        code: `
      if ($context['fields']['image']) {
        $context['classList'] .= ' dark-block';
      }`
      },
      button: {
        status: this.state.hasbutton,
        code: `
      if ($context['fields']['image'] && $context['fields']['link']) {
        $context['classList'] .= ' inherit-link';
      }`
      },
      hasimagetextoverlay: {
        status: this.state.hasimagetextoverlay
      }
    }
  ) {
    let buildString = "";
    buildString += dedent(
      `
      <?php 
      ${(() => {
        return include.image.status && include.hasimagetextoverlay.status
          ? include.image.code
          : "";
      })()}

      ${(() => {
        return include.image.status && include.button.status
          ? include.button.code
          : "";
      })()}

    `
    );
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

  buildZeusFontString(
    include = {
      organism: {
        name: this.state.organismName
      },
      title: {
        status: this.state.hastitle,
        code:
          `.font` +
          this.state.titlesize +
          ` {
          @include font-size(` +
          this.state.titlesize +
          `px, 38px, ` +
          this.state.titlesize +
          `px, ` +
          this.state.titlesize +
          `px, 1.2); // 14px
          display: inline-block;
      };`
      },
      text: {
        status: this.state.hastext,
        code:
          `.font` +
          this.state.fontsize +
          ` {
          @include font-size(` +
          this.state.fontsize +
          `px, 38px, ` +
          this.state.fontsize +
          `px, ` +
          this.state.fontsize +
          `px, 1.2); // 14px
          display: inline-block;
      };`
      }
    }
  ) {
    let buildString = "";
    buildString += dedent(
      `
      ${(() => {
        return include.title.status ? include.title.code : "";
      })()}

      ${(() => {
        return include.text.status ? include.text.code : "";
      })()}
      `
    );
    return buildString;
  }

  resizeHandle(event, data) {}

  render() {
    const zeusCssString = this.buildZeusCssString();
    const zeusHtmlString = this.buildZeusHtmlString();
    const zeusGutenbergRegister = this.buildZeusGutenbergString();
    const zeusPHPString = this.buildZeusPhpString();
    const zeusFontString = this.buildZeusFontString();

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
              <label className="aspectRatio">
                <span>Title Size</span>
                <input
                  type="text"
                  id="titlesize"
                  onChange={this.handleInputChange}
                  value={this.state.titlesize}
                  placeholder="Title Size"
                />
              </label>
              <label className="aspectRatio">
                <span>Font Size</span>
                <input
                  type="text"
                  id="fontsize"
                  onChange={this.handleInputChange}
                  value={this.state.fontsize}
                  placeholder="Font Size"
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
              <label className="isColumn">
                <span>Has Title</span>
                <input
                  type="checkbox"
                  id="hastitle"
                  onChange={this.handleCheckbox}
                  checked={this.state.hastitle}
                  value={this.state.hastitle}
                  placeholder="hastitle"
                />
              </label>
              <label className="isColumn">
                <span>Has Text</span>
                <input
                  type="checkbox"
                  id="hastext"
                  onChange={this.handleCheckbox}
                  checked={this.state.hastext}
                  value={this.state.hastext}
                  placeholder="hastext"
                />
              </label>
              <label className="isColumn">
                <span>Has Button</span>
                <input
                  type="checkbox"
                  id="hasbutton"
                  onChange={this.handleCheckbox}
                  checked={this.state.hasbutton}
                  value={this.state.hasbutton}
                  placeholder="hasbutton"
                />
              </label>
              <label className="isColumn">
                <span>Has Image</span>
                <input
                  type="checkbox"
                  id="hasimage"
                  onChange={this.handleCheckbox}
                  checked={this.state.hasimage}
                  value={this.state.hasimage}
                  placeholder="hasimage"
                />
              </label>
              <label className="isColumn">
                <span>Has Image Text Overlay</span>
                <input
                  type="checkbox"
                  id="hasimagetextoverlay"
                  onChange={this.handleCheckbox}
                  checked={this.state.hasimagetextoverlay}
                  value={this.state.hasimagetextoverlay}
                  placeholder="hasimagetextoverlay"
                />
              </label>
              <label className="isColumn">
                <span>Has Form</span>
                <input
                  type="checkbox"
                  id="hasform"
                  onChange={this.handleCheckbox}
                  checked={this.state.hasform}
                  value={this.state.hasform}
                  placeholder="hasform"
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
              <ZeusCss
                key={this.state.organismName}
                organismName={this.state.organismName}
                stringName={zeusCssString}
              />
              <SyntaxHighlighter language="css" style={hybrid}>
                {zeusCssString}
              </SyntaxHighlighter>
              <div className="titleContainer">
                <div className="importName">
                  views/organisms/{this.state.organismName}.twig
                </div>
                <div className="fileName">{this.state.organismName}.twig</div>
              </div>
              <SyntaxHighlighter language="javascript" style={hybrid}>
                {zeusHtmlString}
              </SyntaxHighlighter>
              <div className="titleContainer">
                <div className="importName">
                  templates/organisms/{this.state.organismName}.php
                </div>
                <div className="fileName">{this.state.organismName}.php</div>
              </div>
              <SyntaxHighlighter language="php" style={hybrid}>
                {zeusPHPString}
              </SyntaxHighlighter>
              <div className="titleContainer">
                <div className="importName">
                  templates/register/register.php
                </div>
                <div className="fileName">
                  Gutenberg Component (register.php)
                </div>
              </div>
              <SyntaxHighlighter language="php" style={hybrid}>
                {zeusGutenbergRegister}
              </SyntaxHighlighter>
              <div className="titleContainer">
                <div className="importName">@import 'fonts/_fonts.scss';</div>
                <div className="fileName">Render Fonts</div>
              </div>
              <SyntaxHighlighter language="css" style={hybrid}>
                {zeusFontString}
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
