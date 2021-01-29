import React from 'react';
import PropTypes from 'prop-types';

import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/addon/lint/css-lint');
require('codemirror/addon/hint/css-hint');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');
require('codemirror/mode/css/css');
require('../../util/codemirror/autorefresh.ext');

require('jquery-ui/ui/widgets/resizable');

export default class CustomCssEditor extends React.Component {

  render() {

    return (
      <CodeMirror
        value={this.props.value}
        autoFocus
        detach
        options={{
          mode: 'css',
          lineNumbers: true,
          tabSize: 2,
          indentUnit: 2,
          theme: 'eclipse',
          autoRefresh: { force: true }, // force option is enabled by autorefresh.ext.js -- Yuki Takei
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: { 'Ctrl-Space': 'autocomplete' },
        }}
        editorDidMount={(editor, next) => {
          // TODO GW-5043 enable codeMirror https://youtrack.weseek.co.jp/issue/GW-5043
          // resizable with jquery.ui
          // $(editor.getWrapperElement()).resizable({
          //   resize() {
          //     editor.setSize($(this).width(), $(this).height());
          //   },
          // });
        }}
        onChange={(editor, data, value) => {
          this.props.onChange(value);
        }}
      />
    );
  }

}

CustomCssEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
