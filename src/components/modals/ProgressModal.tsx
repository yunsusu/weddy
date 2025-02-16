import { useState } from 'react';
import styles from './style.module.scss';
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function ProgressModal({
  item,
  onChange,
}: {
  item: {
    id: number;
    title: string;
    progress: string;
    assignee: string;
    date: string;
    state: boolean;
    amount: string;
  },
  onChange: (id: number, newProgress: "시작전" | "진행중" | "완료") => void;
}) {
  const [ isModalOpen, setIsModalOpen] = useState(false);

  const handleProgressChange = (newProgress: "시작전" | "진행중" | "완료") => {
    onChange(item.id, newProgress); // 부모 컴포넌트로 상태 변경 요청
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div>
      <button className={cn(
        "progress",
        item.progress === "시작전" && "before",
        item.progress === "진행중" && "now",
        item.progress === "완료" && "complete"
        )}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <p>{item.progress}</p>
        <span>∨</span>
      </button>

      {isModalOpen && (
        <div>
          <ul className={cn("modalUL")}>
            {["시작전", "진행중", "완료"].map((status) => (
              <li key={status}>
                <button
                  className={cn(
                    "progress",
                    status === "시작전" && "before",
                    status === "진행중" && "now",
                    status === "완료" && "complete"
                    )}
                  onClick={() => {
                    handleProgressChange(status as "시작전" | "진행중" | "완료"); 
                    setIsModalOpen(false);
                  }}
                >
                  {status}
                  <span className={cn("modalSpan")}>∨</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
};