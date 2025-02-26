import styles from "./style.module.scss";
import classNames from "classnames/bind";

import fontBold from "@/../public/icons/font-bold.png"
import fontItalic from "@/../public/icons/font-italic.png"
import fontMiddle from "@/../public/icons/font-middleline.png"
import fontUnder from "@/../public/icons/font-underline.png"
import youtube from "@/../public/icons/youtube-icon.png"
import link from "@/../public/icons/link-icon.png"
import picture from "@/../public/icons/picture-icon.png"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const cn = classNames.bind(styles);

type EditorProps = {
  content: any;
  onContentChange: any;
}

export default function TextEditor({ content, onContentChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Range | null>(null);
  const [isUpdatingContent, setIsUpdatingContent] = useState(false);

  useEffect(() => {
    if (editorRef.current && !isUpdatingContent) {
      if (editorRef.current.innerHTML !== content) {
        editorRef.current.innerHTML = content;
      }
    }
  }, [content, isUpdatingContent]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.getRangeAt && sel.rangeCount) {
      setSelection(sel.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    if (selection) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(selection);
      }
    }
  };

  const applyStyle = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    saveSelection();
    handleChange();
  };

  const insertLink = () => {
    const url = prompt("링크 URL을 입력하세요:", "https://");
    if (url) {
      applyStyle("createLink", url);
    }
  };

  const insertYoutube = () => {
    const youtubeUrl = prompt("유튜브 URL을 입력하세요:", "https://www.youtube.com/watch?v=");
    if (youtubeUrl) {
      const videoId = youtubeUrl.split("v=")[1]?.split("&")[0];
      if (videoId) {
        editorRef.current?.focus();
        restoreSelection();
        
        // 반응형 iframe 코드로 수정
        const embedCode = `
          <div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
            <iframe 
              style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
              src="https://www.youtube.com/embed/${videoId}" 
              frameborder="0" 
              allowfullscreen>
            </iframe>
          </div>
        `;
        
        document.execCommand("insertHTML", false, embedCode);
        handleChange();
      } else {
        alert("유효한 유튜브 URL이 아닙니다.");
      }
    }
  };

  const insertImage = () => {
    
  };

  const attachFile = () => {
    
  };

    // 에디터 내용 변경 감지
    const handleChange = () => {
      if (editorRef.current) {
        setIsUpdatingContent(true);
        const newContent = editorRef.current.innerHTML;
        onContentChange(newContent);
        // 상태 업데이트 완료 후 플래그 리셋 (비동기 처리)
        setTimeout(() => {
          setIsUpdatingContent(false);
        }, 0);
      }
    };
  
    // 에디터에 포커스가 들어올 때 선택 영역 저장
    const handleFocus = () => {
      document.addEventListener("selectionchange", saveSelection);
    };
  
    // 에디터에서 포커스가 나갈 때 이벤트 리스너 제거
    const handleBlur = () => {
      document.removeEventListener("selectionchange", saveSelection);
    };
  
    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    useEffect(() => {
      return () => {
        document.removeEventListener("selectionchange", saveSelection);
      };
    }, []);

  return (
    <div className={cn("editorWrap")}>
      <div className={cn("editorContents")}>
        <div 
          ref={editorRef}
          className={cn("editor", "scroll")}
          contentEditable={true}
          onInput={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          spellCheck="false"
        ></div>
        <div className={cn("editorBtns")}>
          <button type="button" onClick={() => applyStyle("bold")}>
            <Image src={fontBold} alt="폰트 굵게" width={35} height={35} />
          </button>
          <button type="button" onClick={() => applyStyle("italic")}>
            <Image src={fontItalic} alt="폰트 기울기" width={35} height={35} />
          </button>
          <button type="button" onClick={() => applyStyle("strikeThrough")}>
            <Image src={fontMiddle} alt="폰트 중간줄" width={35} height={35} />
          </button>
          <button type="button" onClick={() => applyStyle("underline")}>
            <Image src={fontUnder} alt="폰트 밑줄" width={35} height={35} />
          </button>
          <button type="button" onClick={insertYoutube}>
            <Image src={youtube} alt="유튜브 링크" width={35} height={35} />
          </button>
          <button type="button" onClick={attachFile}>
            <Image src={link} alt="파일 첨부" width={35} height={35} />
          </button>
          <button type="button" onClick={insertImage}>
            <Image src={picture} alt="사진 첨부" width={35} height={35} />
          </button>
        </div>
      </div>
      
    </div>
  )
};