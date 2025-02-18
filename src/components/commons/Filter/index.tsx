import useFilterStore from "@/lib/store/filter";
import useSideMenuValStore from "@/lib/store/sideMenuValue";
import classNames from "classnames/bind";
import FilterShare from "./FilterShare";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function Filter() {
  const { setFilterBox } = useFilterStore();
  const { sideMenuValue } = useSideMenuValStore();

  // sideMenuValue.length 만큼 반복해서 항목을 구성합니다.
  const category = {
    title: "항목",
    item: sideMenuValue?.map((menu: { title: any }) => menu.title), // 각 menu의 title을 추출해서 배열에 넣음
  };

  // progressStatus 정의
  const progressStatus = {
    title: "진행 상태",
    item: ["시작전", "진행중", "완료"],
  };

  return (
    <div>
      <FilterShare item={category} />
      <FilterShare item={progressStatus} />
    </div>
  );
}
