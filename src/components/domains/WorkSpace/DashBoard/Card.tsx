import date from "@/../public/icons/date.svg";
import assignee from "@/../public/icons/people.svg";
import CheckListPage from "@/components/modals/CheckListPage";
import useCardStore from "@/lib/store/choiceCard";
import useColorStore from "@/lib/store/mainColor";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface Card {
  item: {
    id: number;
    title: string;
    assignee: string;
    date: string;
    state: boolean;
    amount: string;
    progress2: number;
    progress: string;
  };
}

export default function Card({ item }: Card) {
  const { setChoiceCard } = useCardStore();
  const { color } = useColorStore();
  const state = item.progress2;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const choice = () => {
    setChoiceCard(String(item.id));
  };
  return (
    <>
      <div
        className={item.state ? cn("cardWrap") : cn("cardWrapNone")}
        style={{ border: `1px solid ${color}` }}
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className={cn("cardState", {
            cardState1: state === 1,
            cardState2: state === 2,
            cardState3: state === 3,
          })}
        >
          {state === 1 ? "시작전" : state === 2 ? "진행중" : "완료"}
        </div>
        <div className={cn("title")} onClick={choice}>
          <div
            className={cn("colorTag")}
            style={{ border: `1px solid ${color}`, background: color }}
          ></div>
          <h3>{item.title}</h3>
        </div>
        <div className={cn("assignee")}>
          <Image src={assignee} alt="담당자" width={16} height={16} />
          <p>{item.assignee}</p>
        </div>
        <div className={cn("date")}>
          <Image src={date} alt="날짜" width={16} height={16} />
          <p>{item.date}</p>
        </div>
      </div>
      {isModalOpen && (
        <CheckListPage onClose={() => setIsModalOpen(false)} item={item} />
      )}
    </>
  );
}
