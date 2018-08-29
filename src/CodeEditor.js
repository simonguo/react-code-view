import React from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import trim from 'lodash/trim';

class CodeEditor extends React.Component {
  static propTypes = {
    readOnly: PropTypes.bool,
    code: PropTypes.string,
    theme: PropTypes.string,
    matchBrackets: PropTypes.bool,
    lineNumbers: PropTypes.bool,
    lineWrapping: PropTypes.bool,
    tabSize: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    matchBrackets: true,
    tabSize: 2,
    theme: 'default'
  };

  componentDidMount() {
    const { lineNumbers, lineWrapping, matchBrackets, tabSize, readOnly, theme } = this.props;

    if (CodeMirror === undefined) {
      return;
    }

    this.editor = CodeMirror.fromTextArea(this.textarea, {
      mode: 'jsx',
      lineNumbers,
      lineWrapping,
      matchBrackets,
      tabSize,
      readOnly,
      theme
    });

    this.editor.on('change', this.handleChange);
  }

  componentDidUpdate() {
    const { readOnly } = this.props;
    if (readOnly) {
      this.editor.setValue();
    }
  }

  handleChange = () => {
    const { readOnly, onChange } = this.props;
    if (!readOnly && onChange) {
      onChange(this.editor.getValue());
    }
  };

  render() {
    const { style, className, code } = this.props;

    return (
      <div style={style} className={className}>
        <textarea
          ref={ref => {
            this.textarea = ref;
          }}
          defaultValue={trim(code)}
        />
      </div>
    );
  }
}

export default CodeEditor;
