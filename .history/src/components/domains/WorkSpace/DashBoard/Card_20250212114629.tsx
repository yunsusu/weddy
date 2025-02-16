import date from "@/../public/icons/date.svg";
import assignee from "@/../public/icons/people.svg";
import useCardStore from "@/lib/store/choiceCard";
import useColorStore from "@/lib/store/mainColor";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import CheckListPage from "@/components/modals/CheckListPage";

const cn = classNames.bind(styles);

interface Card {
  item: {
    id: number;
    title: string;
    assignee: string;
    date: string;
    state: boolean;
  };
}

export default function Card({ item }: Card) {
  const { setChoiceCard } = useCardStore();
  const { color } = useColorStore();

  // 모달 창 띄우기 위한 router 연결
  const router = useRouter();
  const { modal } = router.query;

  const choice = () => {
    setChoiceCard(String(item.id));
  };
  return (
    <div
      className={item.state ? cn("cardWrap") : cn("cardWrapNone")}
      style={{ border: `1px solid ${color}` }}
      onClick={() => router.push("?modal=checkList")}
    >
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

    { modal === "checkList" && (
      <CheckListPage></CheckListPage>
    ) }
  )
}
