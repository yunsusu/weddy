import styles from "./style.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function RenderElement({ attributes, children, element }) {
  switch (element.type) {
    case "heading":
      return <h2 {...attributes} className="renderElementXlBold">{children}</h2>;
    case "bulleted-list":
      return <ul {...attributes} className="re"></ul>
  }
}