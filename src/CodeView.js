import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/addon/runmode/runmode';

import CodeEditor from './CodeEditor';
import parseHTML from './parseHTML';
import Preview from './Preview';

const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const { Markdown } = require('react-markdown-reader');
const classNames = require('classnames');

class CodeView extends React.Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    delay: PropTypes.number,
    showCode: PropTypes.bool,
    source: PropTypes.string,
    children: PropTypes.string,
    dependencies: PropTypes.object,
    babelTransformOptions: PropTypes.object,
    buttonClassName: PropTypes.string,
    showCodeIcon: PropTypes.node
  };

  static defaultProps = {
    delay: 0,
    babelTransformOptions: {
      presets: ['stage-0', 'react', 'es2015']
    }
  };
  constructor(props) {
    super(props);

    const { code, beforeHTML, afterHTML } = parseHTML(props.children || props.source);
    this.state = {
      beforeHTML,
      afterHTML,
      code,
      showCode: props.showCode,
      hasError: false,
      errorMessage: null
    };
    this.executeCode = this.executeCode.bind(this);

    setTimeout(() => {
      this.executeCode();
    }, props.delay);
  }

  executeCode(nextCode) {
    const { babelTransformOptions, dependencies } = this.props;
    const originalRender = ReactDOM.render;
    let hasError = false;
    ReactDOM.render = element => {
      this.initialExample = element;
    };
    try {
      let code = window.Babel.transform(nextCode || this.state.code, babelTransformOptions).code;
      let statement = '';

      if (dependencies) {
        Object.keys(dependencies).forEach(key => {
          statement += `var ${key}= dependencies.${key};\n `;
        });
      }

      /* eslint-disable */
      eval(`${statement} ${code}`);
      /* eslint-enable */
    } catch (err) {
      hasError = true;
      console.error(err);
    } finally {
      ReactDOM.render = originalRender;
      if (!hasError) {
        this.forceUpdate();
      }
    }
  }

  handleCodeChange = val => {
    this.setState({
      hasError: false,
      errorMessage: null
    });
    this.executeCode(val);
  };

  handleShowCode = () => {
    const showCode = !this.state.showCode;
    this.setState({ showCode });
  };

  handleError = error => {
    this.setState({
      hasError: true,
      errorMessage: error.message
    });
  };

  addPrefix = name => {
    const { classPrefix } = this.props;
    if (classPrefix) {
      return `${classPrefix}${name}`;
    }
    return name;
  };

  renderExample() {
    const { hasError, errorMessage } = this.state;
    return (
      <Preview hasError={hasError} errorMessage={errorMessage} onError={this.handleError}>
        <div>{this.initialExample ? this.initialExample : <div>Loading...</div>}</div>
      </Preview>
    );
  }

  render() {
    const { className, style, showCodeIcon, buttonClassName } = this.props;
    const { showCode, beforeHTML, afterHTML } = this.state;
    const icon = (
      <span>
        <i className={classNames(this.addPrefix('icon'), this.addPrefix('icon-code'))} />
      </span>
    );

    return (
      <div className={className} style={style}>
        <Markdown>{beforeHTML}</Markdown>
        <div className="code-view-wrapper">
          {this.renderExample()}
          <div className="code-view-toolbar">
            <button
              className={classNames(
                this.addPrefix('btn'),
                this.addPrefix('btn-xs'),
                buttonClassName
              )}
              onClick={this.handleShowCode}
            >
              {typeof showCodeIcon !== 'undefined' ? showCodeIcon : icon}
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

export default CodeView;
