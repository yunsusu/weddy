import styles from './style.module.scss';
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function CheckListPage({
  onClose
}: {
  onClose: () => void;
}) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {

    console.log("클릭된 요소:", e.target);
    console.log("이벤트 핸들러가 적용된 요소:", event.currentTarget);

    if(e.target === e.currentTarget) {
      onClose();
      console.log("바깥 클릭 감지됨!")
    }
  }

  return (
    <div className={cn("checkModalWrap")} onClick={handleOutsideClick}>
      <div>
        <button onClick={onClose}>→</button>
      </div>

    </div>
  );
};