import dot from "@/../public/icons/dot.svg";
import moreBtn from "@/../public/icons/moreGray.svg";
import DropDown from "@/components/commons/DropDown";
import { addSmallCard, changeCardName, deleteCard } from "@/lib/apis/workSpace";
import useFilterStore from "@/lib/store/filter";
import useWorkSpaceStore from "@/lib/store/workSpace";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
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
      attachedFileUrl: string;
    }[];
  };
  memberData: any;
  setCard: any;
  num: number;
  onOpenModal: (item: any) => void;
  setReRander: any;
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
  setReRander,
}: DashBoardProps) {
  const { searchWord, setSearchWord } = useWorkSpaceStore();
  const [dotDrop, setDotDrop] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<boolean>(true);
  const [newTitle, setNewTitle] = useState<string>(data?.title);
  const [filteredItems, setFilteredItems] = useState(
    data?.smallCatItems.sort((a, b) => (a.title === "새로운 항목" ? -1 : 1))
  );
  const { filterBox } = useFilterStore();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setNewTitle(data.name);
    changeCardTitle(data.name);
  };
  const nowDate = new Date();
  const addItem = {
    id: 0,
    checklistId: data?.checklistId,
    largeCatItemId: data?.id,
    title: "새로운 항목",
    dueDate: nowDate,
    assigneeName: "담당자",
    body: "",
    statusName: "시작전",
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
        setReRander((prev: any) => prev + 1);
        return newCard;
      }),
  });

  const { mutate: changeCardTitle } = useMutation({
    mutationFn: (name: string) =>
      changeCardName(memberData.memberId, data.id, name),
    onSuccess: () => {
      setChangeName(true);
      setReRander((prev: number) => prev + 1);
    },
  });

  const { mutate: addCard } = useMutation({
    mutationFn: () => addSmallCard(addItem),
    onSuccess: () => {
      setReRander((prev: number) => prev + 1);
    },
  });

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const result = data?.smallCatItems.filter((item) =>
        item?.title.includes(searchWord)
      );
      setFilteredItems(result);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchWord, data?.smallCatItems]);

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

      {/* Droppable 영역 */}
      <Droppable droppableId={`${data?.id}`}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn("droppableContainer")}
          >
            {/* Draggable 아이템들 */}
            {filteredItems
              ?.filter(
                (item: any) =>
                  // assignee가 undefined이거나 비어있으면 모든 항목을 표시
                  (filterBox.assignee && filterBox.assignee.length === 0) ||
                  filterBox.assignee?.includes(item.assigneeName)
              )
              .filter((item: any) => {
                if (filterBox.dueDate === "") return true;
                if (filterBox.dueDate !== "" && item.dueDate === null)
                  return false;
                // console.log(filterBox.dueDate);
                const subItemDate = new Date(item.dueDate);
                const today = new Date();
                const filterDate = new Date(today);
                filterDate.setDate(today.getDate() + Number(filterBox.dueDate));

                const diffInDays = Math.ceil(
                  (filterDate.getTime() - subItemDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                console.log(filterBox.dueDate, diffInDays);

                if (Number(filterBox.dueDate) <= -1) {
                  return diffInDays >= 1;
                }

                return diffInDays >= 0 && diffInDays <= filterBox.dueDate + 1;
              })
              .map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        item={item}
                        checklistId={data.checklistId}
                        onOpenModal={onOpenModal}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
