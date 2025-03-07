import styles from "@/pages/dashBoard/style.module.scss"
import classNames from "classnames/bind"
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";
import { LargeCatItem } from "@/lib/apis/types/types";

import calenderIcon from "@/../public/images/Calendar.gif"
import weddingIcon from "@/../public/images/Wedding Arch.gif"
import lipstickIcon from "@/../public/images/Lipstick.gif"
import airplaneIcon from "@/../public/images/Airplane_Gif.gif"
import ringIcon from "@/../public/icons/progress-ring-icon.svg"
import hanbokIcon from "@/../public/icons/progress-hanbok-icon.svg"
import congratulationIcon from "@/../public/images/Congratulations.gif"
import houseIcon from "@/../public/images/home_GIF.gif"
import defaultIcon2 from "@/../public/images/Heart_Gif.gif"
import closeIcon from "@/../public/icons/close-modal-icon.svg"

const cn = classNames.bind(styles);

interface DashBoarModalProps {
  data: LargeCatItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function DashBoardModal({ data, isOpen, onClose }: DashBoarModalProps) {
  
  const icons: Record<string, StaticImageData> = {
    '결혼 준비 시작': calenderIcon, 
    '웨딩홀': weddingIcon, 
    '스드메': lipstickIcon, 
    '신혼여행': airplaneIcon, 
    '예물/예단': ringIcon, 
    '예복/한복': hanbokIcon,
    '본식': congratulationIcon, 
    '신혼집': houseIcon
  };

  const defaultIcon: StaticImageData = defaultIcon2;

  const getCategoryIcon = (categoryTitle: string): StaticImageData => {
    return icons[categoryTitle] || defaultIcon;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return(
    <div className={cn("dashBoardModalWrap")} onClick={handleBackdropClick}>
      <div className={cn("dashBoardModalContents")}>
        <div className={cn("modalGNB")}>
          <p>{data.title}</p>
          <button type="button" className={cn("modalCloseBtn")} onClick={onClose}>
            <Image src={closeIcon} alt={`data.title || "Category icon" + 닫기`} width={26} height={26} />
          </button>
        </div>
        <div className={cn("modalGNBImg")}>
          <Image src={getCategoryIcon(data.title)} alt={data.title || "Category icon"} width={500} height={240} />
        </div>
        <ul className={cn("dashBoardModalUl")}>
          {data.smallCatItems && data.smallCatItems.map((item, index) => (
            <li key={item.id}>
              <p>{index+1}</p>
              <span>{item.title}</span>
              <span className={cn("modalAmount")}>{(item.amount || 0).toLocaleString()} 원</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};