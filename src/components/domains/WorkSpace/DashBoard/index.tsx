import dot from "@/../public/icons/dot.svg";
import moreBtn from "@/../public/icons/moreGray.svg";
import DropDown from "@/components/commons/DropDown";
import { addSmallCard, changeCardName, deleteCard } from "@/lib/apis/workSpace";
import useWorkSpaceStore from "@/lib/store/workSpace";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import Card from "./Card";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface DashBoardProps {
  data: {
    id: number;
    checklistId: number;
    title: string;
    smallCatItems: {
      id: number;
      largeCatItemId: number;
      title: string;
      dueDate: string;
      assigneeName: string;
      statusName: string;
    }[];
  };
  memberData: any;
  setCard: any;
  num: number;
  onOpenModal: (item: any) => void;
}

interface IFormInput {
  name: string;
}

export default function DashBoard({
  data,
  memberData,
  setCard,
  num,
  onOpenModal,
}: DashBoardProps) {
  const { searchWord, setSearchWord } = useWorkSpaceStore();
  const [dotDrop, setDotDrop] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>(data.title);
  const [filteredItems, setFilteredItems] = useState(
    data.smallCatItems.sort(
      (a, b) => Number(b.statusName) - Number(a.statusName)
    ) // statusName을 기준으로 정렬
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setNewTitle(data.name);
    changeCardTitle(data.name);
  };
  const nowDate = new Date();
  const addItem = {
    checklistId: data.checklistId,
    largeCatItemId: data.id,
    title: "새로운 항목",
    dueDate: nowDate,
    assigneeName: "담당자",
    body: "내용",
    statusName: "1",
    amount: 0,
  };

  const ref = useRef<any>(null);

  const handleClickOutside = () => {
    setDotDrop(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const { mutate: deleteCardMutate } = useMutation({
    mutationFn: () => deleteCard(memberData.memberId, data.id),
    onSuccess: () =>
      setCard((prev: any) => {
        const newCard = [...prev];
        newCard.splice(num, 1);
        return newCard;
      }),
  });

  const { mutate: changeCardTitle } = useMutation({
    mutationFn: (name: string) =>
      changeCardName(memberData.memberId, data.id, name),
    onSuccess: () => setChangeName(true),
  });

  const { mutate: addCard } = useMutation({
    mutationFn: () => addSmallCard(addItem),
    onSuccess: () => {
      setCard((prev: any[]) =>
        prev.map((card) =>
          card.id === data.id
            ? {
                ...card,
                smallCatItems: [addItem, ...card.smallCatItems, addItem],
              }
            : card
        )
      );
    },
  });

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const result = data.smallCatItems.filter((item) =>
        item.title.includes(searchWord)
      );
      setFilteredItems(result);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchWord, data.smallCatItems]);

  return (
    <div
      className={
        searchWord && filteredItems.length === 0
          ? cn("dashWrapNone")
          : cn("dashWrap")
      }
    >
      <div className={cn("title")}>
        {changeName ? (
          <h2>{newTitle}</h2>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" defaultValue={newTitle} {...register("name")} />
            <button type="submit">변경</button>
          </form>
        )}
        <span>
          <Image
            src={moreBtn}
            alt="more"
            width={20}
            height={20}
            onClick={() => addCard()}
          />
          <div onClick={() => setDotDrop((prev) => !prev)} ref={ref}>
            <Image src={dot} alt="dot" width={20} height={20} />
            {dotDrop && (
              <DropDown
                item={[
                  {
                    color: "gray",
                    text: "섹션 이름 바꾸기",
                    click: () => setChangeName(false),
                  },
                  {
                    color: "red",
                    text: "섹션 삭제하기",
                    click: deleteCardMutate,
                  },
                ]}
              />
            )}
          </div>
        </span>
      </div>

      {filteredItems.map((item) => (
        <Card
          key={item.id}
          item={item}
          checklistId={data.checklistId}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
}
