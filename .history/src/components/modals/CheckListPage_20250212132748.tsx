import styles from './style.module.scss';
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function CheckListPage({
  onClose
}: {
  onClose: () => void;
}) {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if(event.target === e.currentTarget) {
      onClose();
      console.log("바깥 클릭 감지됨!")
    }
  }

  return (
    <div className={cn("checkModalWrap")} onClick={handleOutsideClick}>
      <div>
        <button onClick={() => {onClose(); console.log("버튼 클릭됨")}}>→</button>
      </div>

    </div>
  );
};