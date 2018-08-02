import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToMarkdown } from "draft-js-export-markdown";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Actions from "../actions/Actions";

const styles = theme => ({
  button: {
    borderColor: '#FFF',
    float: 'right',
    margin: '10px 0'
  }
});

class ReviewMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({
      editorState
    });
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.submit = (e) => this._submit();
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _submit() {
    Actions.postReview(
      this.props.articleId,
      stateToMarkdown(this.state.editorState.getCurrentContent())
    );
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;

    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div
        className="review__message"
      >
        <div className="RichEditor-root">
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="Review this article"
              ref="editor"
              spellCheck
            />
          </div>
        </div>

        <div>
          <Button
            className={classes.button}
            color="primary"
            onClick={this.submit}
            size="large"
            variant="outlined"
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
  case 'blockquote':
    return 'RichEditor-blockquote';
  default:
    return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';

    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD'
  },
  {
    label: 'Italic',
    style: 'ITALIC'
  },
  {
    label: 'Underline',
    style: 'UNDERLINE'
  }
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};

ReviewMessage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewMessage);
