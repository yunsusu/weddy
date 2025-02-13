import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import classNames from "classnames/bind";
import deleteIcon from "@/../public/icons/deleteRed.svg"
import Image from 'next/image';
import useColorStore from '@/lib/store/mainColor';
import Editor from '@/components/commons/Editor/index.js'
import mockData from '@/pages/workSpace/index'

const cn = classNames.bind(styles);

export default function CheckListPage({
  onClose,
}: {
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { color } = useColorStore();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

  }, [onClose]);

  return (
    <div className={cn("checkModalWrap")} ref={modalRef}>
      <div className={cn("modalNav")}>
        <button onClick={onClose}>→</button>
        <Image className={cn("trashIcon")} src={deleteIcon} alt="소분류 삭제하기" width={24} height={24} />
      </div>

      <div className={cn("modalContents")}>
        <div>시작 전</div>
        {mockData.map((item) => (
          <p></p>
        ))}

      </div>

      <Editor />
    </div>
  );
};