import profileImg from "@/../public/images/testImg.jpg";
import DashBoard from "@/components/domains/WorkSpace/DashBoard";
import SideMenu from "@/components/domains/WorkSpace/SideMenu";
import SpaceSearch from "@/components/domains/WorkSpace/SpaceSearch";
import { getCard, getMember } from "@/lib/apis/workSpace";
import useColorStore from "@/lib/store/mainColor";
import useSideMenuStore from "@/lib/store/sideMenu";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";
import CheckListPage from "@/components/modals/CheckListPage";

const cn = classNames.bind(styles);

const mockData2 = {
  id: 1,
  memberId: "string",
  getdDay: 100,
};

export default function WorkSpace() {
  const [name, setName] = useState<String>(mockData2.memberId);
  const [dDay, setDDay] = useState<number>(mockData2.getdDay);
  const [cardId, setCardId] = useState<number>(1);
  const { sideMenuState, setSideMenuState } = useSideMenuStore();
  const { color } = useColorStore();
  const [ selectItem, setSelectItem ] = useState(null);

  const { data: cardDatas } = useQuery({
    queryKey: ["cardData", cardId],
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
  }

  console.log(memberData);
  return (
    <div className={cn("workSide")}>
      <span className={cn("sideMenuBox", { active: sideMenuState })}></span>

      <main className={cn("workSpaceWrap")}>
        <div className={cn("profile")}>
          <Image src={profileImg} alt="프로필 사진" width={169} height={169} />
          <h2>
            {name}님, 소중한 결혼식을 위해
            <br /> 웨디가 함께할께요.
          </h2>
          <div className={cn("dDay")}>
            <p>결혼식</p>
            <p className={cn("ddayNum")}>
              D - <span style={{ color: color }}>{dDay}</span>
            </p>
          </div>
        </div>

        <SpaceSearch placeholder={"할 일을 검색해 주세요."} />

        <div className={cn("dashWrap")}>
          {cardDatas?.map((item) => (
            <DashBoard data={item} onOpenModal={handleOpenModal} />
          ))}
        </div>
      </main>

      <SideMenu state={sideMenuState} />

      {selectItem && (
        <CheckListPage onClose={handleCloseModal} item={selectItem} />
      )}
    </div>
  );
}
