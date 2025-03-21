import useFilterStore from "@/lib/store/filter";
import useSideMenuValStore from "@/lib/store/sideMenuValue";
import classNames from "classnames/bind";
import FilterShare from "./FilterShare";
import DateFilter from "./dateFilter";
import ProgressFilter from "./progressFilter";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function MobileFilter() {
  const { filterBox, setFilterBox } = useFilterStore();
  const { sideMenuValue } = useSideMenuValStore();

  // sideMenuValue.length 만큼 반복해서 항목을 구성합니다.
  const category = {
    title: "카테고리",
    item: Array.isArray(sideMenuValue)
      ? sideMenuValue.map((menu: { title: any }) => menu.title)
      : [], // 각 menu의 title을 추출해서 배열에 넣음
  };

  const assignee = {
    title: "담당자",
    item: ["신랑", "신부"],
  };

  // 마감일
  const dueDate = {
    title: "마감일",
    item: ["오늘", "이번주", "다음주", "이번달"],
  };

  // assignee 정의
  const assigneeStatus = {
    title: "��당자",
    item: ["신��", "신부"],
  };
  const handleAssigneeChange = (newStatus: any) => {
    setFilterBox({
      category: filterBox.category,
      progressStatus: filterBox.progressStatus,
      assignee: filterBox.assignee.includes(newStatus)
        ? filterBox.assignee.filter((status) => status !== newStatus)
        : [...filterBox.assignee, newStatus],
      dueDate: filterBox.dueDate,
    });
  };

  // dueDate 정의

  // progressStatus 정의
  const progressStatus = {
    title: "진행 상태",
    item: ["시작전", "진행중", "완료"],
  };
  const handleCategoryChange = (newStatus: any) => {
    setFilterBox({
      category: filterBox.category.includes(newStatus)
        ? filterBox.category.filter((status) => status !== newStatus)
        : [...filterBox.category, newStatus],
      progressStatus: filterBox.progressStatus,
      assignee: [],
      dueDate: filterBox.dueDate,
    });
  };

  return (
    <div className={cn("moWrap")}>
      <FilterShare item={category} func={handleCategoryChange} status={true} />
      <ProgressFilter item={progressStatus} status={true} />
      <FilterShare item={assignee} func={handleAssigneeChange} status={true} />
      <DateFilter item={dueDate} status={true} />
    </div>
  );
}
