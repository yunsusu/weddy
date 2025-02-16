import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import classNames from "classnames/bind";
import trash from '@/../public/icons/deleteRed.svg'

const cn = classNames.bind(styles);

export default function CheckListPage({
  onClose
}: {
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

  }, [onClose]);

  return (
    <div className={cn("checkModalWrap")} ref={modalRef}>
      <nav className={cn("modalNav")}>
        <button onClick={onClose}>→</button>
        <Image src={trash} 
         />
      </nav>
      <div>
        
      </div>

    </div>
  );
};