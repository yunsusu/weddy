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
import { deleteCard } from "@/lib/apis/workSpace";
import { useMutation } from "@tanstack/react-query";

const cn = classNames.bind(styles);

interface DashBoardProps {
  data: {
    id: number,
    checklistId: number,
    title: string,
    smallCatItems: {
      id: number,
        largeCatItemId: number,
        title: string,
        dueDate: string,
        assigneeName: string,
        statusName: string
    }[];
  };
  onOpenModal: (item: any) => void
}

export default function DashBoard({ data, onOpenModal }: DashBoardProps) {
  const { searchWord, setSearchWord } = useWorkSpaceStore();
  const [dotDrop, setDotDrop] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ref = useRef<any>(null);

  const handleClickOutside = () => {
    setDotDrop(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const { mutate: deleteCardMutate } = useMutation({
    mutationFn: () => deleteCard(data.id, data.checklistId),
  });

  return (
    <div className={cn("dashWrap")}>
      <div className={cn("title")}>
        <h2>{data?.title}</h2>
        <span>
          <Image src={moreBtn} alt="more" width={20} height={20} />
          <div onClick={() => setDotDrop((prev: boolean) => !prev)} ref={ref}>
            <Image src={dot} alt="dot" width={20} height={20} />
            {dotDrop && (
              <DropDown
                item={[
                  { color: "gray", text: "섹션 이름 바꾸기", click : {}},
                  { color: "red", text: "섹션 삭제하기", click : {deleteCardMutate}},
                ]}
              />
            )}
          </div>
        </span>
      </div>

      {data?.smallCatItems.map((item, index) => {
        return <Card key={item.id} item={item} checklistId={data.checklistId} onOpenModal={onOpenModal} />;
      })}
    </div>
  );
}
