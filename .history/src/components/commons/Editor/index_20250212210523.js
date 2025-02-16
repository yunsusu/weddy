import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import Bold from '@/../public/icons/font-bold.svg';
import italic from '@/../public/icons/font-italic.svg';
import underline from '@/../public/icons/font-underline.svg';
import middleline from '@/../public/icons/font-middleline.svg';
import youtube from '@/../public/icons/youtube.svg';
import hiperlink from '@/../public/icons/hiperlink.svg';
import picture from '@/../public/icons/picture-icon.svg';

const DraftEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // 스타일을 토글하는 함수들
  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const toggleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const toggleStrikethrough = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
  };

  // 링크 추가 함수
  const addLink = (link) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const newContentState = contentState.createEntity('LINK', 'MUTABLE', { url: link });
      const entityKey = newContentState.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: newContentState });
      setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
    }
  };

  // 유튜브 영상 삽입
  const insertYouTubeVideo = (url) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('YOUTUBE', 'MUTABLE', { url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  // 이미지 삽입
  const insertImage = (imageUrl) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  // 상태 변경 함수
  const onChange = (newState) => {
    setEditorState(newState);
  };

  return (
    <div>
      <h2>Draft.js 리치 텍스트 에디터</h2>
      <div>
        <button onClick={toggleBold}>
          <img src="" alt='폰트 굵게' />
        </button>
        <button onClick={toggleItalic}>기울이기</button>
        <button onClick={toggleUnderline}>밑줄</button>
        <button onClick={toggleStrikethrough}>중간줄</button>
      </div>

      <div>
        <input 
          type="text" 
          placeholder="링크 URL" 
          onBlur={(e) => addLink(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="유튜브 URL" 
          onBlur={(e) => insertYouTubeVideo(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="이미지 URL" 
          onBlur={(e) => insertImage(e.target.value)} 
        />
      </div>

      <Editor 
        editorState={editorState} 
        onChange={onChange} 
        placeholder="내용을 입력하세요..." 
        style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '20px',
          minHeight: '200px',
        }}
      />
    </div>
  );
};

export default DraftEditor;
