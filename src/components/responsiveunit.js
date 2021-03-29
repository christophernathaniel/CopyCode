import "./responsiveunit.css";
import React, { Component } from "react";

import ZeusCodeblock from "./zeus/zeusCodeblock.js";

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
      settings: this.props.settings,
      inputfields: [1, 2, 3]
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

    this.handleSettingsChange("formatter", !this.state.settings.formatter);
  }

  // State Loop Logic - Replace Settings Variable
  handleSettingsChange(name, value) {
    this.setState((prevState) => {
      let settings = Object.assign({}, prevState.settings); // creating copy of state variable jasper
      settings.[name] = value; // update the name property, assign a new value
      return { settings }; // return new object jasper object
    });
  }

  handleInputTextChange(event) {
    this.handleSettingsChange([event.target.id], event.target.value);
  }

  handleInputChange(event) {
    if (isNaN(event.target.value) || event.target.value <= 1) {
      this.handleSettingsChange([event.target.id], 1);
      return true;
    }
    if (event.target.id) {
      this.handleSettingsChange([event.target.id], parseInt(event.target.value, 10));
      return true;
    }
  }

  handleSubmit(event) {}

  handleCheckbox(event) {
    this.handleSettingsChange([event.target.id], event.target.checked);
  }

  handleArChange(event) {
    if (isNaN(event.target.value) || event.target.value <= 0) {
      this.handleSettingsChange([event.target.id], 0);
      return true;
    }

    this.handleSettingsChange([event.target.id], event.target.value);
  }

  handleResize(event, data) {
    if (data.size.width && data.size.height) {
      this.handleSettingsChange("pxWidthValue",  parseInt(data.size.width, 10));
      this.handleSettingsChange("pxHeightValue",  parseInt(data.size.height, 10));
    }
  }

  buildVanillaString() {
    return "Vanilla String";
  }

  buildZeusHtmlString(
    include = {
      organism: {
        name: this.state.settings.organismName
      },
      loop: {
        status: this.state.settings.isloop,
        start: "\n{% if loops %}",
        end: "\n{% endif %}",
        forstart: "\n{% for loop in loops %}",
        set: "\n{% set fields = loop.fields %}",
        forend: "\n{% endfor %}"
      },
      columns: {
        status: this.state.settings.iscolumn,
        start: `\n<div class="wp-block-columns columns">`,
        end: `\n</div>`,
        singlestart: `\n <div class="wp-block column">`,
        singleend: `\n </div>`
      },
      button: {
        status: this.state.settings.hasbutton,
        // code: `<span class="atom-button">
        //     <a class="button" href="#"></a>
        // </span>`
        code: `{% include 'atoms/button.twig' %}`
      },
      title: {
        status: this.state.settings.hastitle,
        code:
          `{% include 'atoms/text.twig' with { 'font' : 'font` +
          this.state.settings.titlesize +
          ` document-title-font', 'content' : 'Title Text' } %}`
      },
      text: {
        status: this.state.settings.hastext,
        code:
          `{% include 'atoms/text.twig' with { 'font' : 'font` +
          this.state.settings.fontsize +
          ` document-text-font', 'content' : 'Content Text' } %}`
      },
      image: {
        status: this.state.settings.hasimage,
        code: `{% include 'atoms/image.twig' %}`
      },
      form: {
        status: this.state.settings.hasform,
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
        name: this.state.settings.organismName
      },
      button: {
        status: this.state.settings.hasbutton,
        code: `
        a { 
          color: $blue;
        
          &:hover {
            color: $white;
          }
        }`
      },
      hasimagetextoverlay: {
        status: this.state.settings.hasimagetextoverlay,
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
        this.state.settings.pxWidthValue +
        `px, ` +
        this.state.settings.pxWidthValue +
        `px, ` +
        this.state.settings.pxWidthValue +
        `px);
        responsiveUnit('Height', ` +
        this.state.settings.pxHeightValue +
        `px, ` +
        this.state.settings.pxHeightValue +
        `px, ` +
        this.state.settings.pxHeightValue +
        `px); 
       `
    );
    buildString += `\n\n`;
    // Flex
    buildString += dedent(
      `
      @include sm-down() { 
        height: ` +
        this.state.settings.pxHeightValue +
        `px;
        Width: ` +
        this.state.settings.pxWidthValue +
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
        name: this.state.settings.organismName
      },
      image: {
        status: this.state.settings.hasimage,
        code: `
      if ($context['fields']['image']) {
        $context['classList'] .= ' dark-block';
      }`
      },
      button: {
        status: this.state.settings.hasbutton,
        code: `
      if ($context['fields']['image'] && $context['fields']['link']) {
        $context['classList'] .= ' inherit-link';
      }`
      },
      hasimagetextoverlay: {
        status: this.state.settings.hasimagetextoverlay
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
        name: this.state.settings.organismName
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
        name: this.state.settings.organismName
      },
      title: {
        status: this.state.settings.hastitle,
        code:
          `.font` +
          this.state.settings.titlesize +
          ` {
          @include font-size(` +
          this.state.settings.titlesize +
          `px, 38px, ` +
          this.state.settings.titlesize +
          `px, ` +
          this.state.settings.titlesize +
          `px, 1.2); // 14px
          display: inline-block;
      };`
      },
      text: {
        status: this.state.settings.hastext,
        code:
          `.font` +
          this.state.settings.fontsize +
          ` {
          @include font-size(` +
          this.state.settings.fontsize +
          `px, 38px, ` +
          this.state.settings.fontsize +
          `px, ` +
          this.state.settings.fontsize +
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
        {this.state.settings.formatter ? (
          <div className="form-container">
            <form className="input">
              <label className="organismName">
                <span onClick={() => alert("hello")}>organismName:</span>
                <input
                  type="text"
                  id="organismName"
                  onChange={this.handleInputTextChange}
                  value={this.state.settings.organismName}
                  placeholder="Organism Name"
                />
                {this.state.settings.unit}
              </label>
              <label className="pxHeight">
                <span onClick={() => alert("hello")}>height:</span>
                <input
                  type="text"
                  pattern="[0-9]*"
                  id="pxHeightValue"
                  onChange={this.handleInputChange}
                  value={this.state.settings.pxHeightValue}
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
                  value={this.state.settings.pxWidthValue}
                  placeholder="Pixel Width"
                />
              </label>

              <label className="aspectRatio">
                <span>Aspect Ratio</span>
                <input
                  type="text"
                  id="aspectRatio"
                  onChange={this.handleArChange}
                  value={this.state.settings.aspectRatio}
                  placeholder="Aspect Ratio"
                />
              </label>
              <label className="aspectRatio">
                <span>Title Size</span>
                <input
                  type="text"
                  id="titlesize"
                  onChange={this.handleInputChange}
                  value={this.state.settings.titlesize}
                  placeholder="Title Size"
                />
              </label>
              <label className="aspectRatio">
                <span>Font Size</span>
                <input
                  type="text"
                  id="fontsize"
                  onChange={this.handleInputChange}
                  value={this.state.settings.fontsize}
                  placeholder="Font Size"
                />
              </label>
              <label className="isLoop">
                <span>Is Loop</span>
                <input
                  type="checkbox"
                  id="isloop"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.isloop}
                  placeholder="isLoop"
                />
              </label>
              <label className="isColumn">
                <span>Is Column</span>
                <input
                  type="checkbox"
                  id="iscolumn"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.iscolumn}
                  value={this.state.settings.iscolumn}
                  placeholder="isColumn"
                />
              </label>
              <label className="isColumn">
                <span>Has Title</span>
                <input
                  type="checkbox"
                  id="hastitle"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.hastitle}
                  value={this.state.settings.hastitle}
                  placeholder="hastitle"
                />
              </label>
              <label className="isColumn">
                <span>Has Text</span>
                <input
                  type="checkbox"
                  id="hastext"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.hastext}
                  value={this.state.settings.hastext}
                  placeholder="hastext"
                />
              </label>
              <label className="isColumn">
                <span>Has Button</span>
                <input
                  type="checkbox"
                  id="hasbutton"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.hasbutton}
                  value={this.state.settings.hasbutton}
                  placeholder="hasbutton"
                />
              </label>
              <label className="isColumn">
                <span>Has Image</span>
                <input
                  type="checkbox"
                  id="hasimage"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.hasimage}
                  value={this.state.settings.hasimage}
                  placeholder="hasimage"
                />
              </label>
              <label className="isColumn">
                <span>Has Image Text Overlay</span>
                <input
                  type="checkbox"
                  id="hasimagetextoverlay"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.hasimagetextoverlay}
                  value={this.state.settings.hasimagetextoverlay}
                  placeholder="hasimagetextoverlay"
                />
              </label>
              <label className="isColumn">
                <span>Has Form</span>
                <input
                  type="checkbox"
                  id="hasform"
                  onChange={this.handleCheckbox}
                  checked={this.state.settings.hasform}
                  value={this.state.settings.hasform}
                  placeholder="hasform"
                />
              </label>
            </form>
          </div>
        ) : null}

        {this.state.settings.itemCount.map((item) => {
          return (
            <ResizableBox
              id={item}
              key="{item}"
              width={this.state.settings.pxWidthValue}
              height={this.state.settings.pxHeightValue}
              onResize={this.handleResize}
            >
              <div>
                {this.state.settings.pxWidthValue}
                {this.state.settings.unit} x {this.state.settings.pxHeightValue}
                {this.state.settings.unit}
              </div>
            </ResizableBox>
          );
        })}

        <div className="results-container">
          <Tabs>
            <TabList>
              <Tab>Zeus</Tab>
              <Tab>Wordpress</Tab>
              <Tab>Vanilla</Tab>
            </TabList>
            <TabPanel>
              <ZeusCodeblock
                key={1}
                organismName={this.state.settings.organismName}
                renderLang={"css"}
                importName={
                  "@import 'organisms/" + this.state.settings.organismName + "'"
                }
                fileName={this.state.settings.organismName + ".scss"}
                stringData={zeusCssString}
              />

              <ZeusCodeblock
                key={2}
                organismName={this.state.settings.organismName}
                renderLang={"html"}
                importName={
                  "views/organisms/" +
                  this.state.settings.organismName +
                  ".twig"
                }
                fileName={this.state.settings.organismName + ".twig"}
                stringData={zeusHtmlString}
              />

              <ZeusCodeblock
                key={3}
                organismName={this.state.settings.organismName}
                renderLang={"php"}
                importName={
                  "templates/organisms/" +
                  this.state.settings.organismName +
                  ".php"
                }
                fileName={this.state.settings.organismName + ".php"}
                stringData={zeusPHPString}
              />

              <ZeusCodeblock
                key={4}
                organismName={this.state.settings.organismName}
                renderLang={"php"}
                importName={"templates/register/register.php"}
                fileName={"register.php"}
                stringData={zeusGutenbergRegister}
              />

              <ZeusCodeblock
                key={5}
                organismName={this.state.settings.organismName}
                renderLang={"css"}
                importName={"@import 'fonts/_fonts.scss'"}
                fileName={"Render Fonts"}
                stringData={zeusFontString}
              />
            </TabPanel>
            <TabPanel>Wordpress</TabPanel>
            <TabPanel>Vanilla</TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ResponsiveUnit;
