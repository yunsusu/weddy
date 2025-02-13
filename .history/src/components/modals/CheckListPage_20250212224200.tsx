import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import classNames from "classnames/bind";
import deleteIcon from "@/../public/icons/deleteRed.svg"
import Image from 'next/image';
import useColorStore from '@/lib/store/mainColor';
import Editor from '@/components/commons/Editor/index.js'
import { mockData } from '@/lib/apis/mock.js';
import assignee from "@/../public/icons/people.svg";
import date from "@/../public/icons/date.svg";


const cn = classNames.bind(styles);

export default function CheckListPage({
  onClose,
  item,
}: {
  onClose: () => void;
  item: {
    id: number;
    title: string;
    assignee: string;
    date: string;
    state: boolean;
  };
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
        <h2>{item.title}</h2>
        <div className={cn("assignee")}>
          <Image src={assignee} alt="담당자" width={16} height={16} />
          <p>담당자</p>
        </div>
        <div>
          <div>{item.assignee}</div>
          <div>김지연</div>
        </div>
        <div className={cn("date")}>
          <Image src={date} alt="날짜" width={16} height={16} />
          <p>{item.date} 까지</p>
        </div>
        <p></p>
      </div>

      <Editor />
    </div>
  );
};