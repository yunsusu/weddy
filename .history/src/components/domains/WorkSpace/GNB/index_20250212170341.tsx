import logoImg from "@/../public/images/Homepage Logo.svg";
import classNames from "classnames/bind";
import styles from "./style.module.scss";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

const cn = classNames.bind(styles);

export default function GNB() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetch("http://localhost:8080/auth/login/kakao", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      })
    }
  })

  return (
    <nav className={cn("navWrap")}>
      <div className={cn("linkWrap")}>
        <Link href="/" className={cn("logoImgWrap")}>
          <Image className={cn("logoImg")} src={logoImg} alt="로고 사진" width={80} height={50} />
        </Link>
        <Link className={cn("aboutWeddy")} href="/">
          <p>웨디 소개</p>
        </Link>
      </div>
      <div className={cn("lonInWrap")}>
        {!session ? (
          <button 
            className={cn("logInBtn")} 
            onClick={() => signIn("kakao")}> 로그인
          </button>
        ) : (
          <button 
            className={cn("logOutBtn")} 
            onClick={() => signOut({ redirect: true })}> 로그아웃
          </button>
        )}
      </div>
    </nav>
  );
};