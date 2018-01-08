
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/runmode/runmode';

import CodeEditor from './CodeEditor';
import parseHTML from './parseHTML';


const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const { Markdown } = require('react-markdown-reader');
const classNames = require('classnames');


const propTypes = {
  delay: PropTypes.number,
  showCode: PropTypes.bool,
  source: PropTypes.string,
  children: PropTypes.string,
  dependencies: PropTypes.object,
  babelTransformOptions: PropTypes.object,
  buttonClassName: PropTypes.string,
  showCodeIcon: PropTypes.node
};

const defaultProps = {
  delay: 0,
  babelTransformOptions: {
    presets: ['stage-0', 'react', 'es2015'],
  }
};

class CodeView extends React.Component {
  constructor(props) {
    super(props);

    const { code, beforeHTML, afterHTML } = parseHTML(props.children || props.source);
    this.state = {
      beforeHTML,
      afterHTML,
      startLoad: false,
      code,
      showCode: props.showCode
    };
    this.executeCode = this.executeCode.bind(this);
  }

  componentWillMount() {
    const { delay } = this.props;
    setTimeout(() => {
      this.executeCode();
      this.setState({ startLoad: true });
    }, delay);
  }

  executeCode() {


    const { babelTransformOptions, dependencies } = this.props;
    const originalRender = ReactDOM.render;
    ReactDOM.render = (element) => this.initialExample = element;

    try {
      let code = Babel.transform(this.state.code, babelTransformOptions).code;
      let statement = '';

      if (dependencies) {
        for (let key in dependencies) {
          statement += `var ${key}= dependencies.${key};\n `;
        }
      }

      /* eslint-disable */
      eval(`${statement} ${code}`);
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
      <div>
        {
          this.initialExample ? this.initialExample : (
            <div>Loading...</div>
          )
        }
      </div>
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


    const { className, style, showCodeIcon, buttonClassName } = this.props;
    const { showCode, beforeHTML, afterHTML, } = this.state;
    const icon = (
      <span><i className="icon icon-code" /></span>
    );
    return (
      <div className={className} style={style}>
        <Markdown>{beforeHTML}</Markdown>
        <div className="code-view-wrapper">
          {this.renderExample()}
          <div className="code-view-toolbar">
            <button
              className={classNames('btn btn-xs', buttonClassName)}
              onClick={this.handleShowCode}
            >
              {showCodeIcon ? showCodeIcon : icon}
            </button>
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
        <Markdown>{afterHTML}</Markdown>
      </div>
    );
  }
}

CodeView.propTypes = propTypes;
CodeView.defaultProps = defaultProps;

export default CodeView;
