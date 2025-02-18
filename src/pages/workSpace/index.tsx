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
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import DashBoardMore from "@/components/domains/WorkSpace/DashBoardMore";
import useSideMenuValStore from "@/lib/store/sideMenuValue";
import useWorkSpaceStore from "@/lib/store/workSpace";

const cn = classNames.bind(styles);

const mockData2 = {
  id: 1,
  memberId: "string",
  getdDay: 100,
};

export default function WorkSpace() {
  const [card,setCard] = useState([])
  const [cardId, setCardId] = useState<number>(1);
  const [cardLength, setCardLength] = useState<number>(0);
  const { sideMenuState } = useSideMenuStore();
  const { sideMenuValue, setSideMenuValue } = useSideMenuValStore();
  const { color } = useColorStore();

  const { data: cardDatas, isSuccess } = useQuery({
    queryKey: ["cardData", cardId,cardLength],
    queryFn: () => getCard(cardId),
  });

  const { data: memberData } = useQuery({
    queryKey: ["memberData", cardId],
    queryFn: () => getMember(cardId),
  });

  useEffect(()=>{
    setCard(cardDatas)
    setSideMenuValue(cardDatas)
  },[isSuccess])

  return (
    <div className={cn("workSide")}>
      <span className={cn("sideMenuBox", { active: sideMenuState })}></span>

      <main className={cn("workSpaceWrap")}>
        <div className={cn("profile")}>
          <Image src={profileImg} alt="프로필 사진" width={169} height={169} />
          <h2>
            {memberData?.memberId}님, 소중한 결혼식을 위해
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
          {card?.map((item:any, index:number) => (
            <DashBoard data={item} key={index} num={index} memberData={memberData} setCard={setCard}/>
          ))}
          <DashBoardMore memberData={memberData} setCardLength={setCardLength}/>
        </div>
      </main>

      <SideMenu state={sideMenuState} />
    </div>
  );
}
