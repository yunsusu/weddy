import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);
export default function MobileItem({ item, func }: any) {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${item}`}
        name="category"
        value="category-1"
        onChange={(e) => {
          func(item);
        }}
      />
      <label htmlFor={`checkbox-${item}`}>{item}</label>
    </div>
  );
}
