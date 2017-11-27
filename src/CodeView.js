
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/runmode/runmode';

import CodeEditor from './CodeEditor';
import splitDocs from './splitDocs';


const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const { Button, IconFont } = require('rsuite');
const { Markdown } = require('react-markdown-reader');


const propTypes = {
  showCode: PropTypes.bool,
  renderCode: PropTypes.bool,
  source: PropTypes.string,
  dependencies: PropTypes.object
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
    const originalRender = ReactDOM.render;
    ReactDOM.render = (element) => this.initialExample = element;

    try {

      let code = Babel.transform(this.state.code, {
        presets: ['stage-0', 'react', 'es2015']
      }).code;

      /* eslint-disable */
      eval(code);
      /* eslint-enable */

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

    const example = (
      <div>{this.initialExample}</div>
    );
    return (
      <div
        className="code-view"
      >
        {example}
      </div>
    );
  }

  render() {

    this.executeCode();
    const { className, style } = this.props;
    const { showCode } = this.state;

    return (
      <div className={className} style={style}>
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
