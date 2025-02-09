import classNames from "classnames/bind";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);
export default function Item({ item }: any) {
  return (
    <div>
      <input
        type="checkbox"
        id={item}
        name="category"
        value="category-1"
        onChange={(e) => {
          //   alert("sdf");
        }}
      />
      <label htmlFor={item}>{item}</label>
    </div>
  );
}
