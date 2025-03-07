import arrow from "@/../public/icons/downArrow.svg";
import styles from "@/pages/style.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cn = classNames.bind(styles);

interface ScrollArrowProps {
  direction: "up" | "down";
  onClick: () => void;
  className?: string;
}

const ScrollArrow = ({ direction, onClick, className }: ScrollArrowProps) => {
  return (
    <div
      className={cn(
        "scrollArrow",
        direction === "up" ? "upArrow" : "downArrow",
        className
      )}
      onClick={onClick}
    >
      {direction === "up" ? (
        <Image
          src={arrow}
          alt="화살표"
          width={50}
          height={50}
          style={{ transform: "rotate(180deg)" }}
        />
      ) : (
        <Image src={arrow} alt="화살표" width={50} height={50} />
      )}
    </div>
  );
};

export default ScrollArrow;
