import profileImg from "@/../public/images/testImg.jpg";
import DashBoard from "@/components/domains/WorkSpace/DashBoard";
import SideMenu from "@/components/domains/WorkSpace/SideMenu";
import SpaceSearch from "@/components/domains/WorkSpace/SpaceSearch";
import useColorStore from "@/lib/store/mainColor";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";
import GNB from "@/components/domains/WorkSpace/GNB";

const cn = classNames.bind(styles);

const mockData = {
  dash: "예식장",
  item: [
    {
      id: 1,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: true,
    },
    {
      id: 2,
      title: "예식장 예약하기",
      assignee: "신부",
      date: "2025.01.02",
      state: true,
    },
    {
      id: 3,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.09",
      state: true,
    },
    {
      id: 4,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
    },
    {
      id: 5,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
    },
    {
      id: 6,
      title: "부모님 메이크업 업체 선정",
      assignee: "신랑",
      date: "2025.01.29",
      state: false,
    },
  ],
};

export default function WorkSpace() {
  const [name, setName] = useState<String>("이름");
  const [dDay, setDDay] = useState<number>(100);
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const { color } = useColorStore();

  return (
    <div className={cn("workSide")}>
      <span className={cn("sideMenuBox", { active: sideMenu })}></span>
      <div className={cn("side")} onClick={() => setSideMenu((prev) => !prev)}>
        {sideMenu ? "<<" : ">>"}
      </div>
      <main className={cn("workSpaceWrap")}>
        <GNB></GNB>
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

      <SideMenu state={sideMenu} />
    </div>
  );
}
