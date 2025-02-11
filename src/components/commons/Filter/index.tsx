import dashIconOff from "@/../public/icons/dashIcon.svg";
import useFilterStore from "@/lib/store/filter";
import classNames from "classnames/bind";
import Image from "next/image";
import Item from "./item";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

const category = [
  "대분류",
  "대분류1",
  "대분류2",
  "대분류3",
  "대분류4",
  "대분류5",
  "대분류6",
  "대분류7",
  "대분류8",
];
const progressStatus = [
  "progressStatus",
  "progressStatus1",
  "progressStatus2",
  "progressStatus3",
  "progressStatus4",
  "progressStatus5",
];

export default function Filter() {
  const { setFilterBox } = useFilterStore();

  return (
    <div>
      <div className={cn("filterTitle")}>
        <p>대분류</p>
        <Image src={dashIconOff} alt="대분류" width={20} height={20} />
      </div>
      <div>
        {category.map((item, index) => {
          return (
            <div key={index} className={cn("filterWrap")}>
              <Item item={item} />
            </div>
          );
        })}
      </div>
      <div className={cn("filterTitle")}>
        <p>진행현황</p>
        <Image src={dashIconOff} alt="진행현황" width={20} height={20} />
      </div>
      <div>
        {progressStatus.map((item, index) => {
          return (
            <div key={index} className={cn("filterWrap")}>
              <Item item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
