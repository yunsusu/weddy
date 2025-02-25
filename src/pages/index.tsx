import classNames from "classnames/bind";
import Link from "next/link";
import styles from "./style.module.scss";
import { useWorkSpaceStore } from '@/lib/store/workSpaceData'
import { useRouter } from "next/router";
import { useState } from "react";

const cn = classNames.bind(styles);

export default function Home() {
  const setChecklistId = useWorkSpaceStore((state) => state.setChecklistId);
  const router = useRouter();
  const [ userData, setUserData ] = useState(null);

  const handleWorkSpaceClick = (id: number) => {
    if (userData) {
      setChecklistId(id);
      router.push("/workSpace");
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      <div className={cn("indexWrap")}>
        <div className={cn("indexBKG")}>
          <h1 className={cn("indexTitle")}>
            결혼의 모든 것
            <br /> 웨디에서 쉽고 간편하게
          </h1>
        </div>
        <div className={cn("checkList")}>
          <Link href="/workSpace" className={cn("indexBtn")} onClick={() => handleWorkSpaceClick(1)}>
            체크리스트 만들기
          </Link>
        </div>
      </div>
    </div>
  );
}
