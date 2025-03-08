import drop from "@/../public/icons/arrow.svg";
import useFilterStore from "@/lib/store/filter";
import classNames from "classnames/bind";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import MoProgressItem from "./moProgressItem";
import ProgressItem from "./progressItem";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function DateFilter({ item, status }: any) {
  const [dropState, setDropState] = useState<boolean>(false);
  const [a, setA] = useState<string>("");

  const { filterBox, setFilterBox } = useFilterStore();

  const handleDrop = () => {
    setDropState((prev) => !prev);
  };

  const handleDueDateChange = (newStatus: string) => {
    let minDate = new Date();
    let now = new Date();

    if (newStatus === "오늘") {
      // 오늘 그대로 유지
    } else if (newStatus === "이번주") {
      minDate.setDate(minDate.getDate() + 7); // 현재 날짜에서 7일 후
    } else if (newStatus === "다음주") {
      minDate.setDate(minDate.getDate() + 14); // 현재 날짜에서 14일 후
    } else if (newStatus === "이번달") {
      minDate.setMonth(minDate.getMonth() + 1);
      minDate.setDate(0); // 이번 달의 마지막 날로 설정
    }

    const diffInDays = Math.ceil(
      (minDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    console.log(filterBox.dueDate, String(diffInDays));
    setFilterBox({
      category: filterBox.category,
      progressStatus: filterBox.progressStatus,
      assignee: [],
      dueDate: filterBox.dueDate === diffInDays ? "" : diffInDays,
    });
  };
  useEffect(() => {
    if (status) {
      setDropState(true);
    }
  }, []);
  useEffect(() => {
    if (filterBox.dueDate === 0) {
      setA("오늘");
    } else if (filterBox.dueDate >= 1 && filterBox.dueDate <= 7) {
      setA("이번주");
    } else if (filterBox.dueDate >= 8 && filterBox.dueDate <= 14) {
      setA("다음주");
    } else if (filterBox.dueDate <= 30 && filterBox.dueDate !== "") {
      setA("이번달");
    } else {
      setA("");
    }
  }, [filterBox.dueDate]);

  return (
    <div>
      {/* filterTitle 부분 */}
      <div className={cn("filterTitle")} onClick={handleDrop}>
        <p>{item.title}</p>
        <Image
          src={drop}
          alt={item.title}
          width={20}
          height={20}
          style={{ transform: dropState ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {/* filterWrap 리스트 */}
      <div className={cn(dropState ? "filterMoOff" : "filterMo")}>
        {item?.item?.map((item: any, index: Key | null | undefined) => (
          <div
            key={index}
            className={cn(dropState ? "filterWrapOff" : "filterWrap")}
          >
            {status ? (
              <MoProgressItem
                item={item}
                func={handleDueDateChange}
                selectedStatus={a}
              />
            ) : (
              <ProgressItem
                item={item}
                func={handleDueDateChange}
                selectedStatus={a}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
