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
    largeCatItemId: number;
    title: string;
    dueDate: string;
    assigneeName: string;
    statusName: string;
  };
  checklistId: any;
  onOpenModal?: (item: any) => void;
}

export default function Card({ item, checklistId, onOpenModal }: Card) {
  const { setChoiceCard } = useCardStore();
  const { color } = useColorStore();
  const statusName = Number(item.statusName);
  const itemDate = item?.dueDate === "string" ? item.dueDate.split("T")[0] : "";

  const ids = {
    checklistId: checklistId,
    largeCatItemId: item.largeCatItemId,
    smallCatItemId: item.id,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const choice = () => {
    setChoiceCard(String(item.id));
  };
  return (
    <>
      <div
        className={item.statusName ? cn("cardWrap") : cn("cardWrapNone")}
        style={{ border: `1px solid ${color}` }}
        onClick={() => onOpenModal?.(item)}
      >
        <div
          className={cn("cardState", {
            cardState1: statusName === 1,
            cardState2: statusName === 2,
            cardState3: statusName === 3,
          })}
        >
          {statusName === 1 ? "시작전" : statusName === 2 ? "진행중" : "완료"}
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
          <p>{item.assigneeName}</p>
        </div>
        <div className={cn("date")}>
          <Image src={date} alt="날짜" width={16} height={16} />
          <p>{itemDate}</p>
        </div>
      </div>
      {isModalOpen && (
        <CheckListPage
          onClose={() => setIsModalOpen(false)}
          item={item}
          ids={ids}
        />
      )}
    </>
  );
}
