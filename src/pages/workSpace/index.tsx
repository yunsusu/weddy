import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function WorkSpace() {
  return <main className={cn("workSpaceWrap")}>test</main>;
}
