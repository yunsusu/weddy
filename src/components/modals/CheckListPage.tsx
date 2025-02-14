import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import classNames from "classnames/bind";
import deleteIcon from "@/../public/icons/deleteRed.svg"
import Image from 'next/image';
import useColorStore from '@/lib/store/mainColor';
import Editor from '@/components/commons/Editor/index.js'
import assignee from "@/../public/icons/people.svg";
import date from "@/../public/icons/date.svg";
import amount from '@/../public/icons/amount-icon.png'
import detail from '@/../public/icons/detail-icon.png'
import ProgressModal from './ProgressModal';

const cn = classNames.bind(styles);

export default function CheckListPage({
  onClose,
  item,
}: {
  onClose: () => void;
  item: {
    id: number;
    title: string;
    progress: string;
    assignee: string;
    date: string;
    state: boolean;
    amount: string;
  }
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState(item);

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

  const handleProgressChange = (id: number, newProgress: "시작전" | "진행중" | "완료") => {
    if (currentItem.id === id) {
      setCurrentItem((prevItem) => ({
        ...prevItem,
        progress: newProgress,
      }));
    }
  };

  return (
    <div className={cn("checkModalWrap")} ref={modalRef}>
      <div className={cn("modalNav")}>
        <button onClick={onClose}>→</button>
        <button className={cn("trashIcon")}>
          <Image src={deleteIcon} alt="소분류 삭제하기" width={24} height={24} />
        </button>
      </div>

      <div className={cn("modalContents")}>
        <ProgressModal item={currentItem} onChange={handleProgressChange} />
        <h2>{item.title}</h2>
        <div className={cn("assignee", "label")}>
          <Image src={assignee} alt="담당자" width={16} height={16} />
          <p>담당자</p>
        </div>
        <div className={cn("people")}>
          <div>{item.assignee}</div>
          <div>김지연</div>
        </div>
        <div className={cn("date", "label")}>
          <Image src={date} alt="날짜" width={16} height={16} />
          <p>{item.date} 까지</p>
        </div>
        <div className={cn("amount", "label")}>
          <Image src={amount} alt="금액" width={16} height={16} />
          <p>{item.amount} 원</p>
        </div>
        <div className={cn("label")}>
          <Image src={detail} alt='내용' width={16} height={16} />
          <p>내용</p>
        </div>
      </div>

      <Editor />
    </div>
  );
};