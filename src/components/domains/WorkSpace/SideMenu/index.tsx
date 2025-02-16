import checkIconOn from "@/../public/icons/checkIcon.svg";
import dashIconOff from "@/../public/icons/dashIcon.svg";
import Filter from "@/components/commons/Filter";
import classNames from "classnames/bind";
import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function SideMenu({ state }: { state: boolean }) {
  const [check, setCheck] = useState<boolean>(false);

  return (
    <aside className={cn("wrap", { active: state })}>
      <div className={cn("sideMenuWrap")}>
        <ul>
          <li className={cn("choiceMenu")}>
            {check ? (
              <Image
                src={checkIconOn}
                alt="체크리스트"
                width={18}
                height={18}
              />
            ) : (
              <Image
                src={checkIconOn}
                alt="체크리스트"
                width={18}
                height={18}
              />
            )}
            <p>체크리스트</p>
          </li>
          <li>
            {check ? (
              <Image src={dashIconOff} alt="대시보드" width={18} height={18} />
            ) : (
              <Image src={dashIconOff} alt="대시보드" width={18} height={18} />
            )}
            <p>대시보드</p>
          </li>
        </ul>
      </div>

      <div className={cn("sideFilter")}>
        <Filter />
      </div>
    </aside>
  );
}
