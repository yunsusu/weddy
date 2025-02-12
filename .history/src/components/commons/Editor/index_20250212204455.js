import React, { useState } from 'react';
import { Editor, EditorState } from 'draft-js';

const DraftEditor = () => {
  // EditorState를 관리하는 상태를 설정
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 에디터 상태가 변경될 때 호출되는 함수
  const onChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <div>
      <h2>Draft.js 에디터</h2>
      <Editor 
        editorState={editorState} 
        onChange={onChange}  // 상태 변경 시 호출
      />
    </div>
  );
};

export default DraftEditor;
