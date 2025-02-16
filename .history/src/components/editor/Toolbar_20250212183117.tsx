import { toggleMark } from "@/lib/slateUtils";
import styles from "./style.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function Toolbar({ editor }) {
  return (
    <div className={cn(toolbar)}>
      <button onClick={() => toggleMark(editor, "bold")} className={cn("toolbarBold")}>굵게</button>
      <button onClick={() => toggleMark(editor, "italic")} className={cn("toolbarItalic")}>기울기</button>
    </div>
  )
}