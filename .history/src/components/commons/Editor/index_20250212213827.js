import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import styles from '@/components/modals/style.module.scss';
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

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
      <div>
        <div className={cn("modalContents")}>
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
        <div className={cn("modalFooter")}>
          <div className={cn("footerContents")}>
            <button onClick={toggleBold}>
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8537 7C20.8685 7 22.3691 7.45 23.3556 8.35C24.342 9.25 24.8352 10.58 24.8352 12.34C24.8352 13.28 24.5938 14.11 24.1111 14.83C23.6284 15.53 22.9148 16.08 21.9704 16.48C21.0259 16.86 19.8611 17.05 18.4759 17.05L18.6019 15.7C19.2525 15.7 19.9975 15.79 20.837 15.97C21.6765 16.13 22.4846 16.43 23.2611 16.87C24.0586 17.29 24.7093 17.89 25.213 18.67C25.7377 19.43 26 20.41 26 21.61C26 22.93 25.7691 24.01 25.3074 24.85C24.8667 25.69 24.279 26.34 23.5444 26.8C22.8099 27.26 22.0228 27.58 21.1833 27.76C20.3438 27.92 19.5358 28 18.7593 28H10.9204C10.3747 28 9.91296 27.83 9.53519 27.49C9.1784 27.13 9 26.69 9 26.17V8.83C9 8.31 9.1784 7.88 9.53519 7.54C9.91296 7.18 10.3747 7 10.9204 7H18.8537ZM18.287 10.54H12.6833L14.5093 10V13V15.7L12.7148 15.22H18.3815C18.9901 15.22 19.5358 15.03 20.0185 14.65C20.5012 14.27 20.7426 13.72 20.7426 13C20.7426 12.14 20.5117 11.52 20.05 11.14C19.6093 10.74 19.0216 10.54 18.287 10.54ZM18.5389 18.76H12.8093L14.5093 18.5V24.85L12.7778 24.55H18.7593C19.7247 24.55 20.4907 24.31 21.0574 23.83C21.6241 23.33 21.9074 22.59 21.9074 21.61C21.9074 20.71 21.7185 20.06 21.3407 19.66C20.963 19.26 20.5117 19.01 19.987 18.91C19.4623 18.81 18.9796 18.76 18.5389 18.76Z" fill="#ADA8B8"/>
              </svg>
            </button>
            <button onClick={toggleItalic}>
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5 6.99976H19.5259C19.5079 6.99943 19.4899 6.99943 19.4719 6.99976H14.5C13.6716 6.99976 13 7.67133 13 8.49976C13 9.32818 13.6716 9.99976 14.5 9.99976H17.6304L14.297 25.0002H11.5C10.6716 25.0002 10 25.6718 10 26.5002C10 27.3287 10.6716 28.0002 11.5 28.0002H20.5C21.3284 28.0002 22 27.3287 22 26.5002C22 25.6718 21.3284 25.0002 20.5 25.0002H17.3702L20.7036 9.99976H23.5C24.3284 9.99976 25 9.32818 25 8.49976C25 7.67133 24.3284 6.99976 23.5 6.99976Z" fill="#ADA8B8"/>
              </svg>
            </button>
            <button onClick={toggleUnderline}>
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 30H26" stroke="#ADA8B8" stroke-width="2" stroke-linecap="round"/>
                <path d="M24.2234 5C24.7544 5 25.1832 5.18697 25.5099 5.56091C25.8366 5.91407 26 6.36072 26 6.90085V18.1813C26 19.9056 25.6324 21.4325 24.8973 22.762C24.1826 24.0916 23.1922 25.1303 21.9261 25.8782C20.6601 26.6261 19.1898 27 17.5153 27C15.8408 27 14.3604 26.6261 13.0739 25.8782C11.8078 25.1303 10.8072 24.0916 10.0721 22.762C9.35736 21.4325 9 19.9056 9 18.1813V6.90085C9 6.36072 9.18378 5.91407 9.55135 5.56091C9.91892 5.18697 10.3886 5 10.9604 5C11.43 5 11.8486 5.18697 12.2162 5.56091C12.6042 5.91407 12.7982 6.36072 12.7982 6.90085V18.1813C12.7982 19.22 13.0126 20.1237 13.4414 20.8924C13.8907 21.6402 14.4727 22.2219 15.1874 22.6374C15.9225 23.0529 16.6985 23.2606 17.5153 23.2606C18.3934 23.2606 19.2102 23.0529 19.9658 22.6374C20.7213 22.2219 21.3339 21.6402 21.8036 20.8924C22.2733 20.1237 22.5081 19.22 22.5081 18.1813V6.90085C22.5081 6.36072 22.6613 5.91407 22.9676 5.56091C23.2739 5.18697 23.6925 5 24.2234 5Z" fill="#ADA8B8"/>
              </svg>
            </button>
            <button onClick={toggleStrikethrough}>
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 17.3L28 17.3038" stroke="#ADA8B8" stroke-width="2" stroke-linecap="round"/>
                <path d="M17.05 28.6C15.65 28.6 14.39 28.43 13.27 28.09C12.15 27.73 11.08 27.11 10.06 26.23C9.8 26.01 9.6 25.76 9.46 25.48C9.32 25.2 9.25 24.92 9.25 24.64C9.25 24.18 9.41 23.78 9.73 23.44C10.07 23.08 10.49 22.9 10.99 22.9C11.37 22.9 11.71 23.02 12.01 23.26C12.77 23.88 13.52 24.35 14.26 24.67C15.02 24.99 15.95 25.15 17.05 25.15C17.79 25.15 18.47 25.04 19.09 24.82C19.71 24.58 20.21 24.27 20.59 23.89C20.97 23.49 21.16 23.04 21.16 22.54C21.16 21.94 20.98 21.43 20.62 21.01C20.26 20.59 19.71 20.24 18.97 19.96C18.23 19.66 17.29 19.43 16.15 19.27C15.07 19.11 14.12 18.87 13.3 18.55C12.48 18.21 11.79 17.79 11.23 17.29C10.69 16.77 10.28 16.17 10 15.49C9.72 14.79 9.58 14.01 9.58 13.15C9.58 11.85 9.91 10.74 10.57 9.82C11.25 8.9 12.16 8.2 13.3 7.72C14.44 7.24 15.7 7 17.08 7C18.38 7 19.58 7.2 20.68 7.6C21.8 7.98 22.71 8.47 23.41 9.07C23.99 9.53 24.28 10.06 24.28 10.66C24.28 11.1 24.11 11.5 23.77 11.86C23.43 12.22 23.03 12.4 22.57 12.4C22.27 12.4 22 12.31 21.76 12.13C21.44 11.85 21.01 11.59 20.47 11.35C19.93 11.09 19.36 10.88 18.76 10.72C18.16 10.54 17.6 10.45 17.08 10.45C16.22 10.45 15.49 10.56 14.89 10.78C14.31 11 13.87 11.3 13.57 11.68C13.27 12.06 13.12 12.5 13.12 13C13.12 13.6 13.29 14.1 13.63 14.5C13.99 14.88 14.5 15.19 15.16 15.43C15.82 15.65 16.61 15.85 17.53 16.03C18.73 16.25 19.78 16.51 20.68 16.81C21.6 17.11 22.36 17.5 22.96 17.98C23.56 18.44 24.01 19.03 24.31 19.75C24.61 20.45 24.76 21.31 24.76 22.33C24.76 23.63 24.4 24.75 23.68 25.69C22.96 26.63 22.01 27.35 20.83 27.85C19.67 28.35 18.41 28.6 17.05 28.6Z" fill="#ADA8B8"/>
              </svg>
            </button>
            <button>
              <img src='https://s3-alpha-sig.figma.com/img/dafd/86af/fc86550808e7e83ee798d61dafa2d8c3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bjMtEm12h09k~l6e7KLdfgmxJEIjUD8A-oGlO-2rWBiBBtJ51h~y-Y5iZy2TYdaRj9zgT-BRfAIbJN2zJd3ebDfjF4YwU4m~vf0dtcc9XE2eh~yBAcuQv1YuoNBDOR5jj7Xw0f7FsCwWeWQvXhsrAj4dmWiwyTRAAF8Uprs1oO0GlEB7EC5TtK5jn8lf0OwgkpG8h~7A2YPZViGgraE1LKA~ry-UxqafxwgK5msKuNDwcWtE5Yl9pZ0GaZeexZpOTrzOJ-2TosQqbD~o6J-wfFHuWFiS1LAzDi8-73CLNfO3F4WCM8B7iJ3G0Ts-64KiR1nTrw~A2520Hbhs3HgYRg__' width={35} height={35} />
              {/* <input 
                type="text" 
                placeholder="링크 URL" 
                onBlur={(e) => addLink(e.target.value)} 
              /> */}
            </button>
            
              <input 
                type="text" 
                placeholder="유튜브 URL"
                onBlur={(e) => insertYouTubeVideo(e.target.value)} 
              >
              </input>
              <input 
                type="text" 
                placeholder="이미지 URL" 
                onBlur={(e) => insertImage(e.target.value)} 
              />
          </div>
          <button className={cn("saveBtn")}>저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;
