
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const { Button, IconFont } = require('rsuite');
const { Markdown } = require('react-markdown-reader');

import CodeEditor from './CodeEditor';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/runmode/runmode';

import splitDocs from './splitDocs';

const propTypes = {
  showCode: PropTypes.bool,
  renderCode: PropTypes.bool,
  source: PropTypes.string,
  dependencies: PropTypes.object,
  isBanner: PropTypes.bool
};

class CodeView extends React.Component {
  constructor(props) {
    super(props);
    const { code, text } = splitDocs(props.source);
    this.state = {
      text,
      code,
      showCode: props.showCode
    };
    const { dependencies } = props;
    if (dependencies) {
      for (var key in dependencies) {
        window[key] = dependencies[key];
      }
    }
  }
  executeCode() {

    const mountNode = this.refs.example;
    const originalRender = ReactDOM.render;
    ReactDOM.render = (element) => this._initialExample = element;

    try {

      let code = Babel.transform(this.state.code, {
        presets: ['stage-0', 'react', 'es2015']
      }).code;

      if (this.props.renderCode) {
        ReactDOM.render(<CodeEditor code={code} readOnly={true} />, mountNode);
      } else {

        /* eslint-disable */
        eval(code);
        /* eslint-enable */
      }
    } catch (err) {
      console.log(err);
    } finally {
      ReactDOM.render = originalRender;
    }


  }

  handleCodeChange = (val) => {
    this.setState({ code: val });
    this.executeCode();
  }

  handleShowCode = () => {
    const showCode = !this.state.showCode;
    this.setState({ showCode });
  }

  renderExample() {

    let example = (
      <div>{this._initialExample}</div>
    );
    return (
      <div
        className={classNames('code-view', this.props.exampleClassName)}
      >
        {example}
      </div>
    );
  }

  render() {

    const { isBanner } = this.props;
    this.executeCode();

    if (isBanner) {
      return (
        <div className="container">
          <CodeEditor
            key="jsx"
            lineNumbers
            onChange={this.handleCodeChange}
            className="doc-code"
            theme="base16-dark"
            code={this.state.code}
          />
        </div>
      );
    }

    const { showCode } = this.state;


    return (
      <div>
        <Markdown>{this.state.text}</Markdown>
        <div className="code-view-wrapper">
          {this.renderExample()}
          <div className="code-view-toolbar">

            <Button
              size="xs"
              shape={showCode ? 'primary' : 'default'}
              onClick={this.handleShowCode}
            >
              <IconFont icon="code" /> 代码
            </Button>
          </div>

          <CodeEditor
            lineNumbers
            key="jsx"
            onChange={this.handleCodeChange}
            className={`doc-code ${showCode ? 'show' : ''}`}
            theme="base16-light"
            code={this.state.code}
          />
        </div>
      </div>
    );
  }
}

CodeView.propTypes = propTypes;

export default CodeView;
