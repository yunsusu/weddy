import classNames from "classnames/bind";
import styles from "./test.module.scss";

const cn = classNames.bind(styles);

export default function Test() {
  return <div className={cn("test")}>test</div>;
}
