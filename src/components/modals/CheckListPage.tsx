import amount from "@/../public/icons/amount-icon.png";
import date from "@/../public/icons/date.svg";
import deleteIcon from "@/../public/icons/deleteRed.svg";
import detail from "@/../public/icons/detail-icon.png";
import assignee from "@/../public/icons/people.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProgressModal from "./ProgressModal";
import styles from "./style.module.scss";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/lib/apis/axios";

const cn = classNames.bind(styles);

const fetchItemData = async (itemId: number) => {
  try {
    const response = await instance.get(`/items/${itemId}`); // instance 사용
    return response.data;
  } catch (error) {
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

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
  };
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
    };
  }, [onClose]);

  const handleProgressChange = (
    id: number,
    newProgress: "시작전" | "진행중" | "완료"
  ) => {
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
          <Image
            src={deleteIcon}
            alt="소분류 삭제하기"
            width={24}
            height={24}
          />
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
          <Image src={detail} alt="내용" width={16} height={16} />
          <p>내용</p>
        </div>
      </div>

      <div>
        <div className={cn("modalDetail")}></div>
        <div className={cn("modalFooter")}>
          <div className={cn("footerContents")}></div>
          <button className={cn("saveBtn")}>저장하기</button>
        </div>
      </div>
    </div>
  );
}
