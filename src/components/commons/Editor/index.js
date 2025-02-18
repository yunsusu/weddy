// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import styles from '@/components/modals/style.module.scss';
// import classNames from "classnames/bind";

// import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
// import createLinkPlugin from '@draft-js-plugins/anchor'
// import createImagePlugin from "draft-js-image-plugin";
// import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';

// import '@draft-js-plugins/inline-toolbar/lib/plugin.css'

// const cn = classNames.bind(styles);

// const DraftEditor = () => {
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [isFocused, setIsFocused] = useState(false);
//   const editorRef = useRef(null);
//   const isEmpty = !editorState.getCurrentContent().hasText();

//   const { plugins } = useMemo(() => {
//     const imagePlugin = createImagePlugin();
//     const linkPlugin = createLinkPlugin();
//     const inlineToolbarPlugin = createInlineToolbarPlugin();

//     return {
//       plugins: [inlineToolbarPlugin, linkPlugin, imagePlugin],
//       InlineToolbar: inlineToolbarPlugin.InlineToolbar,
//       LinkButton: linkPlugin.LinkButton,
//     };
//   }, [])

//   useEffect(() => {
//     const raw = localStorage.getItem("my-draft");
//     if (raw) {
//       const contentState = convertFromRaw(JSON.parse(raw));
//       const newEditorState = EditorState.createWithContent(contentState);
//       setEditorState(newEditorState);
//     }
//   }, []);


//   // 스타일을 토글하는 함수들
//   const toggleBold = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
//   };

//   const toggleItalic = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
//   };

//   const toggleUnderline = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
//   };

//   const toggleStrikethrough = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
//   };

//   const saveContent = () => {
//     const contentState = editorState.getCurrentContent();
//     const raw = convertToRaw(contentState);
//     localStorage.setItem('my-draft', JSON.stringify(raw, null, 2))
//   }

//   // 링크 추가 함수
//   const addLink = (link) => {
//     const selection = editorState.getSelection();
//     if (!selection.isCollapsed()) {
//       const contentState = editorState.getCurrentContent();
//       const newContentState = contentState.createEntity('LINK', 'MUTABLE', { url: link });
//       const entityKey = newContentState.getLastCreatedEntityKey();
//       const newEditorState = EditorState.set(editorState, { currentContent: newContentState });
//       setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
//     }
//   };

//   // 유튜브 영상 삽입
//   const insertYouTubeVideo = (url) => {
//     const selection = editorState.getSelection();
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity('YOUTUBE', 'MUTABLE', { url });
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
//     setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
//   };

//   // 이미지 삽입
//   const insertImage = (imageUrl) => {
//     const selection = editorState.getSelection();
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
//     setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
//   };

//   // 상태 변경 함수
//   const onChange = (newState) => {
//     setEditorState(newState);
//   };

//   const handleFocus = () => {
//     setIsFocused(true);
//     if (editorRef.current) {
//       editorRef.current.focus(); 
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div className={cn("modalDetail")} onClick={handleFocus}>
//           {!isFocused && isEmpty && (
//             <p className={cn("placeholder")}>내용을 입력하세요.</p>
//           )}
//           <Editor 
//             ref={editorRef}
//             editorState={editorState} 
//             onChange={onChange}
//             className={cn("modalTextarea")}
//             onFocus={() => setIsFocused(true)}
//             onBlur={() => setIsFocused(false)}
//             readonly={false}
//             plugins={plugins}
//           />
//         </div>
//         <div className={cn("modalFooter")}>
//           <div className={cn("footerContents")}>
//             <button onClick={toggleBold}>
//               <img src='/icons/font-bold.png' width={35} height={35} />
//             </button>
//             <button onClick={toggleItalic}>
//               <img src='/icons/font-italic.png' width={35} height={35} />
//             </button>
//             <button onClick={toggleUnderline}>
//               <img src='/icons/font-underline.png' width={35} height={35} />
//             </button>
//             <button onClick={toggleStrikethrough}>
//               <img src='/icons/font-middleline.png' width={35} height={35} />
//             </button>
//             <button>
//               <img src='/icons/youtube-icon.png' width={35} height={35} />
//               {/* <input 
//                 type="text" 
//                 placeholder="링크 URL" 
//                 onBlur={(e) => addLink(e.target.value)}  
//               /> */}
//             </button>
//             <button>
//               <img src='/icons/link-icon.png' width={35} height={35} />
//               {/* <input 
//                 type="text" 
//                 placeholder="유튜브 URL"
//                 onBlur={(e) => insertYouTubeVideo(e.target.value)} 
//               ></input> */}
//             </button>
//             <button>
//               <img src='/icons/picture-icon.png' width={35} height={35} /> 
//               {/* <input 
//                 type="text" 
//                 placeholder="이미지 URL" 
//                 onBlur={(e) => insertImage(e.target.value)} 
//               /> */}
//             </button>
//           </div>
//           <button className={cn("saveBtn")} onClick={saveContent}>저장하기</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DraftEditor;
