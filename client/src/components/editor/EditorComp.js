import React, {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import {EditorState, convertToRaw, ContentState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./EditorComp.scss";

const EditorComp = ({
                      newValue,
                      content
                    }) => {
  // helper function
  const createText = (text) => {
    const blocksFromHtml = htmlToDraft(text);
    const {
      contentBlocks,
      entityMap
    } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
  };
  
  // define the local state, using the createState callback to create the initial value
  const [editorState, setEditorState] = useState(createText(content));
  
  // override the local state any time that the props change
  useEffect(() => {
    setEditorState(createText(content));
  }, [content]);
  
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    newValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  
  return (
    <Container className="editor-comp-container">
      <Editor
        editorState={editorState}
        wrapperClassName="editor-comp-wrapper"
        editorClassName="editor-comp-edit"
        onEditorStateChange={onEditorStateChange}
      />
    </Container>
  );
};

export default EditorComp;