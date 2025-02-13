import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import classNames from "classnames/bind";
import deleteIcon from "@/../public/icons/deleteRed.svg"
import Image from 'next/image';
import useColorStore from '@/lib/store/mainColor';
import Editor from '@/components/commons/Editor/index.js'

const cn = classNames.bind(styles);

const mockData = {
  dash: "예식장",
  item: [
    {
      id: 1,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: true,
    },
    {
      id: 2,
      title: "예식장 예약하기",
      assignee: "신부",
      date: "2025.01.02",
      state: true,
    },
    {
      id: 3,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.09",
      state: true,
    },
    {
      id: 4,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
    },
    {
      id: 5,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
    },
    {
      id: 6,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
    },
  ],
};

export default function CheckListPage({
  onClose,
}: {
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { color } = useColorStore();
    const [name, setName] = useState<String>("이름");
  const [dDay, setDDay] = useState<number>(100);

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
        <p>부모님 메이크업 업체 선정</p>

      </div>

      <Editor />
    </div>
  );
};