import classNames from "classnames/bind";
import styles from "./style.module.scss";
import GNB from "@/components/domains/WorkSpace/GNB";

const cn = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cn("indexWrap")}>
      <GNB></GNB>
      <h1 className={cn("indexTitle")}>
        결혼의 모든 것 
        <br /> 웨디에서 쉽고 간편하게
      </h1>
      <div className={cn("checkList")}>
        <button className={cn("indexBtn")}> 체크리스트 만들기</button>
      </div>
    </div>

  );
}
