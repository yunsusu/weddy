import drop from "@/../public/icons/arrow.svg";
import useFilterStore from "@/lib/store/filter";
import classNames from "classnames/bind";
import Image from "next/image";
import Item from "./item";
import styles from "./style.module.scss";
import FilterShare from "./FilterShare"

const cn = classNames.bind(styles);

const category = {
  title:"항목",
  item:[ 
    "항목",
   "항목1",
   "항목2",
   "항목3",
   "항목4",
   "항목5",
   "항목6",
   "항목7",
   "항목8",
  ]
}
const progressStatus = {
  title:"진행현황",
  item : [
    "progressStatus",
    "progressStatus1",
    "progressStatus2",
    "progressStatus3",
    "progressStatus4",
    "progressStatus5",
  ]
}

export default function Filter() {
  const { setFilterBox } = useFilterStore();

  return (
    <div>
      <FilterShare item={category}/>
      <FilterShare item={progressStatus}/>
    </div>
  );
}
