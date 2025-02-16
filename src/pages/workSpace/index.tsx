import profileImg from "@/../public/images/testImg.jpg";
import DashBoard from "@/components/domains/WorkSpace/DashBoard";
import GNB from "@/components/domains/WorkSpace/GNB";
import SideMenu from "@/components/domains/WorkSpace/SideMenu";
import SpaceSearch from "@/components/domains/WorkSpace/SpaceSearch";
import { getCard } from "@/lib/apis/workSpace";
import useColorStore from "@/lib/store/mainColor";
import useSideMenuStore from "@/lib/store/sideMenu";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

const mockData = {
  dash: "예식장",
  item: [
    {
      id: 1,
      title: "부모님 메이크업 업체 선정",
      progress: "진행중",
      assignee: "신랑",
      date: "2025.01.29",
      state: true,
      amount: "1,000,000",
      progress2: 1,
    },
    {
      id: 2,
      title: "예식장 예약하기",
      progress: "시작전",
      assignee: "신부",
      date: "2025.01.02",
      state: true,
      amount: "1,000,000",
      progress2: 2,
    },
    {
      id: 3,
      title: "부모님 메이크업 업체 선정",
      progress: "시작전",
      assignee: "신랑",
      date: "2025.01.09",
      state: true,
      amount: "1,000,000",
      progress2: 3,
    },
    {
      id: 4,
      title: "부모님 메이크업 업체 선정",
      progress: "시작전",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
      amount: "1,000,000",
      progress2: 1,
    },
    {
      id: 5,
      title: "부모님 메이크업 업체 선정",
      progress: "시작전",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
      amount: "1,000,000",
      progress2: 1,
    },
    {
      id: 6,
      title: "부모님 메이크업 업체 선정",
      progress: "시작전",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
      amount: "1,000,000",
      progress2: 1,
    },
  ],
};

export default function WorkSpace() {
  const [name, setName] = useState<String>("이름");
  const [dDay, setDDay] = useState<number>(100);
  const { sideMenuState, setSideMenuState } = useSideMenuStore();
  const { color } = useColorStore();

  const { data } = useQuery({
    queryKey: ["cardData"],
    queryFn: () => getCard(1),
  });
  console.log(data);
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
          <DashBoard data={mockData} />
          <DashBoard data={mockData} />
          <DashBoard data={mockData} />
          <DashBoard data={mockData} />
          <DashBoard data={mockData} />
        </div>
      </main>

      <SideMenu state={sideMenuState} />
      <GNB />
    </div>
  );
}
