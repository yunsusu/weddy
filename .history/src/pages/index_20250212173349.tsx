import classNames from "classnames/bind";
import styles from "./style.module.scss";
import GNB from "@/components/domains/WorkSpace/GNB";
import Link from "next/link";
import { useSession } from "next-auth/react";

const cn = classNames.bind(styles);

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className={cn("indexWrap")}>
      <GNB></GNB>
      <h1 className={cn("indexTitle")}>
        결혼의 모든 것 
        <br /> 웨디에서 쉽고 간편하게
      </h1>
      <div className={cn("checkList")}>
        {!session ? (
          <Link href="/workSpace"></Link>
        ) : (
          
        )}
        <Link href="/workSpace" className={cn("indexBtn")}> 체크리스트 만들기</Link>
      </div>
    </div>

  );
}
