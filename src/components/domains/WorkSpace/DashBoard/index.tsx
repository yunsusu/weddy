import moreBtn from "@/../public/icons/more.svg";
import useWorkSpaceStore from "@/lib/store/workSpace";
import classNames from "classnames/bind";
import Image from "next/image";
import Card from "./Card";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface DashBoardProps {
  data: {
    dash: string;
    item: {
      id: number;
      title: string;
      assignee: string;
      date: string;
      state: boolean;
    }[];
  };
}

export default function DashBoard({ data }: DashBoardProps) {
  const { searchWord, setSearchWord } = useWorkSpaceStore();
  console.log(data.item);
  return (
    <div className={cn("dashWrap")}>
      <div className={cn("title")}>
        <h2>{data.dash}</h2>
        <Image src={moreBtn} alt="more" width={20} height={20} />
      </div>

      {data.item.map((item, index) => {
        return <Card key={item.id} item={item} />;
      })}
    </div>
  );
}
