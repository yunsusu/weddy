import dot from "@/../public/icons/dot.svg";
import moreBtn from "@/../public/icons/moreGray.svg";
import DropDown from "@/components/commons/DropDown";
import useWorkSpaceStore from "@/lib/store/workSpace";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
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
      progress: string;
      progress2: number;
      amount: string;
    }[];
  };
}

export default function DashBoard({ data }: DashBoardProps) {
  const { searchWord, setSearchWord } = useWorkSpaceStore();
  const [dotDrop, setDotDrop] = useState<boolean>(false);

  const ref = useRef<any>(null);

  const handleClickOutside = () => {
    setDotDrop(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className={cn("dashWrap")}>
      <div className={cn("title")}>
        <h2>{data.dash}</h2>
        <span>
          <Image src={moreBtn} alt="more" width={20} height={20} />
          <div onClick={() => setDotDrop((prev: boolean) => !prev)} ref={ref}>
            <Image src={dot} alt="dot" width={20} height={20} />
            {dotDrop && (
              <DropDown
                item={[
                  { color: "gray", text: "섹션 이름 바꾸기" },
                  { color: "red", text: "섹션 삭제하기" },
                ]}
              />
            )}
          </div>
        </span>
      </div>

      {data.item.map((item, index) => {
        return <Card key={item.id} item={item} />;
      })}
    </div>
  );
}
