import searchImg from "@/../public/icons/searchImg.svg";
import useWorkSpaceStore from "@/lib/store/workSpace";
import classNames from "classnames/bind";
import Image from "next/image";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

interface IFormInput {
  searchWord: string;
}

interface searchProps {
  placeholder: string;
}

export default function SpaceSearch({ placeholder }: searchProps) {
  const { searchWord, setSearchWord } = useWorkSpaceStore();
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  useEffect(() => {
    setSearchWord(watch("searchWord"));
  }, [watch("searchWord")]);

  return (
    <form className={cn("searchInput")} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search">
        <button type="submit">
        <Image src={searchImg} alt="검색버튼" width={26} height={26} />
        </button>
      </label>
      <input
        placeholder={placeholder}
        id="search"
        {...register("searchWord")}
      />
    </form>
  );
}
