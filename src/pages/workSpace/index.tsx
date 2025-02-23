import profileImg from "@/../public/images/testImg.jpg";
import DashBoard from "@/components/domains/WorkSpace/DashBoard";
import DashBoardMore from "@/components/domains/WorkSpace/DashBoardMore";
import SideMenu from "@/components/domains/WorkSpace/SideMenu";
import SpaceSearch from "@/components/domains/WorkSpace/SpaceSearch";
import CheckListPage from "@/components/modals/CheckListPage";
import { getCard, getMember, moveSmallCard } from "@/lib/apis/workSpace";
import useLoginData from "@/lib/store/loginData";
import useColorStore from "@/lib/store/mainColor";
import useSideMenuStore from "@/lib/store/sideMenu";
import useSideMenuValStore from "@/lib/store/sideMenuValue";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function WorkSpace() {
  const [card, setCard] = useState<any>([]);
  const [cardId, setCardId] = useState<number>(1);
  const [cardLength, setCardLength] = useState<number>(0);
  const { sideMenuState } = useSideMenuStore();
  const { sideMenuValue, setSideMenuValue } = useSideMenuValStore();
  const { data: loginData } = useLoginData();
  const { color } = useColorStore();
  const [selectItem, setSelectItem] = useState(null);
  const router = useRouter();

  const { data: cardDatas, isSuccess } = useQuery({
    queryKey: ["cardData", cardId, cardLength],
    queryFn: () => getCard(cardId),
  });

  const { data: memberData } = useQuery({
    queryKey: ["memberData", cardId],
    queryFn: () => getMember(cardId),
  });

  const handleOpenModal = (item: any) => {
    setSelectItem(item);
  };

  const handleCloseModal = () => {
    setSelectItem(null);
  };

  useEffect(() => {
    setCard(cardDatas);
    setSideMenuValue(cardDatas);
  }, [isSuccess]);

  useEffect(() => {
    if (loginData === null) {
      router.push("/login");
    }
    // setCardId(loginData?.id);
  }, [loginData]);

  console.log(card);

  const { mutate: moveCard } = useMutation({
    mutationFn: (data) => moveSmallCard(data),
  });

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    console.log("이동한곳", destination, "이동전", source);
    // 드롭이 완료되지 않으면 아무것도 하지 않음
    if (!destination) return;

    const dragCardList = card.map((c: any) => ({
      ...c,
      smallCatItems: [...c.smallCatItems], // 내부 배열도 복사
    }));
    const [removedCard] = dragCardList[
      source.droppableId - 1
    ].smallCatItems.splice(source.index, 1);
    dragCardList[destination.droppableId - 1].smallCatItems.splice(
      destination.index,
      0,
      removedCard
    );
    console.log(dragCardList);

    let postMoveCard: any = {
      checklistId: dragCardList[destination.droppableId - 1].checklistId,
      largeCatItemId: dragCardList[destination.droppableId - 1].id,
      smallCatItemIds: [],
    };
    dragCardList[destination.droppableId - 1].smallCatItems.map((item: any) => {
      postMoveCard.smallCatItemIds.push(item.id);
    });
    console.log(postMoveCard);

    setCard(dragCardList);
    moveCard(postMoveCard);
  };
  return (
    <div className={cn("workSide")}>
      <span className={cn("sideMenuBox", { active: sideMenuState })}></span>
      <main className={cn("workSpaceWrap")}>
        <div className={cn("profile")}>
          <Image
            src={
              loginData?.profileImageUrl !== null
                ? loginData?.profileImageUrl
                : profileImg
            }
            alt="프로필 사진"
            width={169}
            height={169}
          />
          <h2>
            {loginData?.name}님, 소중한 결혼식을 위해
            <br /> 웨디가 함께할께요.
          </h2>
          <div className={cn("dDay")}>
            <p>결혼식</p>
            <p className={cn("ddayNum")}>
              D - <span style={{ color: color }}>{memberData?.dDay}</span>
            </p>
          </div>
        </div>

        <SpaceSearch placeholder={"할 일을 검색해 주세요."} />

        <div className={cn("dashWrap")}>
          <DragDropContext onDragEnd={onDragEnd}>
            {card?.map((item: any, index: number) => (
              <DashBoard
                data={item}
                key={item.id}
                num={index}
                memberData={memberData}
                setCard={setCard}
                onOpenModal={handleOpenModal}
              />
            ))}
            <DashBoardMore
              memberData={memberData}
              setCardLength={setCardLength}
            />
          </DragDropContext>
        </div>
      </main>

      <SideMenu state={sideMenuState} />

      {selectItem && (
        <CheckListPage onClose={handleCloseModal} item={selectItem} />
      )}
    </div>
  );
}
