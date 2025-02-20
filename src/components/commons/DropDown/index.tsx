import deleteRed from "@/../public/icons/deleteRed.svg";
import rename from "@/../public/icons/rename.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface DropDownProps {
  item: any;
}
export default function DropDown({ item }: DropDownProps) {
  console.log(item)
  return (
    <div className={cn("dropWrap")}>
      {item.map((item: { color: string; text: string, click:()=>void }, index: number) => {
        return (
          <div key={index} className={cn("item")} style={{ color: item.color }} onClick={item.click}>
            <Image
              src={item.color === "red" ? deleteRed : rename}
              alt="버튼"
              width={20}
              height={20}
            />
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
}
