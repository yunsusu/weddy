import styles from './style.module.scss';
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function CheckListPage({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if(e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={cn("checkModalWrap")} onClick={handleOutsideClick}>
      <div>
        <button>→</button>
      </div>

    </div>
  );
};