import styles from "./style.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function Toolbar({ editor }) {
  return (
    <div className={cn(toolbar)}>
      <button onClick={() => toggleMark(editor, "bold")} className={cn("toolbarBold")}>굵게</button>
      <button onClick={() => toggleMark(editor, "ital")} className={cn("toolbarBold")}>굵게</button>
    </div>
  )
}