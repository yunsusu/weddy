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
import { uploadFile } from "@/lib/apis/workSpace";

const cn = classNames.bind(styles);

type EditorProps = {
  content: any;
  onContentChange: any;
}

export default function TextEditor({ content, onContentChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Range | null>(null);
  const [isUpdatingContent, setIsUpdatingContent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);


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
    if (selection && editorRef.current) {
      editorRef.current.focus();
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(selection);
      }
    } else if (editorRef.current) {
      editorRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false); 
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  const applyStyle = (command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    saveSelection();
    handleChange();
  };

  const insertYoutube = () => {
    const youtubeUrl = prompt("유튜브 URL을 입력하세요:", "https://www.youtube.com/watch?v=");
    if (youtubeUrl) {
      const videoId = youtubeUrl.split("v=")[1]?.split("&")[0];
      if (videoId) {
        editorRef.current?.focus();
        restoreSelection();
        
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
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          resolve(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    try {
      setIsUploading(true);
      restoreSelection();

      const newLoadingId = `loading-${Date.now()}`;
      setLoadingId(newLoadingId);
      document.execCommand('insertHTML', false, `<div id="${newLoadingId}" style="text-align: center; padding: 10px;">이미지 업로드 중...</div>`);

      const previewUrl = await createImagePreview(file);
      const loadingElement = document.getElementById(newLoadingId);
      if (loadingElement && editorRef.current) {
        loadingElement.innerHTML = `<img src="${previewUrl}" alt="업로드 중인 이미지" style="max-width: 100%; border: 2px dashed #ccc;" />`;
      }

      const imageUrl = await uploadFile(file); 

      if (!imageUrl) {
        throw new Error("이미지 URL을 찾을 수 없습니다.");
      }

      console.log("업로드된 이미지 URL:", imageUrl);

      if (loadingElement && editorRef.current) {
        loadingElement.outerHTML = `<div class="image-wrapper"><img src="${imageUrl}" alt="업로드된 이미지" style="max-width: 100%;" /></div>`;
        
        const scrollTop = editorRef.current?.scrollTop || 0;
        
        setTimeout(() => {
          if (editorRef.current) {
            const imageWrappers = editorRef.current.querySelectorAll('.image-wrapper');
            const lastImageWrapper = imageWrappers[imageWrappers.length - 1];
            
            if (lastImageWrapper) {
              const range = document.createRange();
              const sel = window.getSelection();
              
              range.setStartAfter(lastImageWrapper);
              range.collapse(true);
              
              if (sel) {
                sel.removeAllRanges();
                sel.addRange(range);
              }
              editorRef.current.scrollTop = scrollTop;
            }
          }
        }, 0);
        
        handleChange();
      }
    } catch (error) {
      alert("이미지 업로드 중 오류가 발생했습니다.");
      console.error("이미지 업로드 오류:", error);

      if (loadingId) {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
          loadingElement.outerHTML = '';
        }
      }
    } finally {
      setIsUploading(false);
      setLoadingId(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = '';
      }
    }
  };

  const attachFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    try {
      setIsUploading(true);
      restoreSelection();
      
      const newLoadingId = `loading-${Date.now()}`;
      setLoadingId(newLoadingId);
      
      document.execCommand('insertHTML', false, `<div id="${newLoadingId}" style="padding: 5px;">파일 업로드 중...</div>`);
      
      const fileUrl = await uploadFile(file);
      if (!fileUrl) {
        throw new Error("파일 URL을 찾을 수 없습니다.");
      }
      
      console.log("업로드된 파일 URL:", fileUrl);

      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'file';
      const iconEmoji = 
        fileExtension === 'pdf' ? '📄' :
        fileExtension === 'doc' || fileExtension === 'docx' ? '📝' :
        fileExtension === 'xls' || fileExtension === 'xlsx' ? '📊' :
        fileExtension === 'ppt' || fileExtension === 'pptx' ? '📽️' :
        fileExtension === 'zip' || fileExtension === 'rar' ? '🗜️' : '📎';

      const loadingElement = document.getElementById(newLoadingId);
      if (loadingElement && editorRef.current) {
        const fileHtml = `
        <div class="file-wrapper" contenteditable="false" style="position: relative; display: flex; align-items: center; padding: 10px; margin: 5px 0; border: 1px solid #eee; border-radius: 5px;">
          <div style="font-size: 24px; margin-right: 10px;">${iconEmoji}</div>
          <div style="flex-grow: 1;">
            <div style="font-weight: bold; margin-bottom: 3px;">${file.name}</div>
            <div style="font-size: 12px; color: #777;">${(file.size / 1024).toFixed(1)} KB</div>
          </div>
          <a href="${fileUrl}" target="_blank" download="${file.name}" style="background-color: #f0f0f0; padding: 5px 10px; border-radius: 3px; text-decoration: none; color: #333; font-size: 12px;">다운로드</a>
          <div class="file-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 5;"></div>
        </div><br />`;
        
        loadingElement.outerHTML = fileHtml;
        
        const scrollTop = editorRef.current?.scrollTop || 0;
        
        setTimeout(() => {
          if (editorRef.current) {
            const fileOverlays = editorRef.current.querySelectorAll('.file-overlay');
            const lastOverlay = fileOverlays[fileOverlays.length - 1];
            
            if (lastOverlay) {
              // 클릭 이벤트 핸들러 추가
              lastOverlay.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 파일 요소 뒤에 커서 위치시키기
                const range = document.createRange();
                const sel = window.getSelection();
                const parentElement = lastOverlay.parentElement;
                
                if (sel && parentElement) {
                  range.setStartAfter(parentElement);
                  range.collapse(true);
                  sel.removeAllRanges();
                  sel.addRange(range);
                  
                  // 에디터에 포커스 주기
                  editorRef.current?.focus();
                }
              });
            }
          }
        }, 0);

        setTimeout(() => {
          if (editorRef.current) {
            // 모든 file-wrapper 요소 찾기
            const fileWrappers = editorRef.current.querySelectorAll('.file-wrapper');
            
            // 방금 추가된 파일(마지막 파일)
            const lastFileWrapper = fileWrappers[fileWrappers.length - 1];
            
            if (lastFileWrapper) {
              // 방금 추가된 파일 뒤에 커서 위치시키기
              const range = document.createRange();
              const sel = window.getSelection();
              
              // 제로 너비 공백 문자 삽입해서 커서 위치 확보
              const textNode = document.createTextNode('\u200B'); // 제로 너비 공백 문자
              
              // 파일 뒤에 텍스트 노드 삽입
              if (lastFileWrapper.nextSibling) {
                editorRef.current.insertBefore(textNode, lastFileWrapper.nextSibling);
              } else {
                editorRef.current.appendChild(textNode);
              }
              
              // 생성한 텍스트 노드에 커서 위치
              range.setStart(textNode, 0);
              range.collapse(true);
              
              if (sel) {
                sel.removeAllRanges();
                sel.addRange(range);
              }
              
              // 스크롤 위치 복원
              editorRef.current.scrollTop = scrollTop;
            }
          }
        }, 0);
        
        handleChange();
      }
    } catch (error) {
      alert("파일 업로드 중 오류가 발생했습니다.");
      console.error("파일 업로드 오류:", error);

      if (loadingId) {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
          loadingElement.outerHTML = '';
        }
      }

    } finally {

      setIsUploading(false);
      setLoadingId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

    const handleChange = () => {
      if (editorRef.current) {
        setIsUpdatingContent(true);
        const newContent = editorRef.current.innerHTML;
        onContentChange(newContent);
        setTimeout(() => {
          setIsUpdatingContent(false);
        }, 0);
      }
    };
  
    const handleFocus = () => {
      document.addEventListener("selectionchange", saveSelection);
    };
  
    const handleBlur = () => {
      document.removeEventListener("selectionchange", saveSelection);
    };
  
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
          <button type="button" onClick={attachFile} disabled={isUploading}>
            <Image src={link} alt="파일 첨부" width={35} height={35} />
          </button>
          <button type="button" onClick={insertImage} disabled={isUploading}>
            <Image src={picture} alt="사진 첨부" width={35} height={35} />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt"
        />
        
        {/* 숨겨진 이미지 입력 */}
        <input
          type="file"
          ref={imageInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </div>
    </div>
  )
};