import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

export default function CheckListPage({
  onClose
}: {
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current )
    }
  })

  

  return (
    <div className={cn("checkModalWrap")} onClick={handleOutsideClick}>
      <div>
        <button onClick={onClose}>→</button>
      </div>

    </div>
  );
};