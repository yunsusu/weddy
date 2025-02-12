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
    console.log("Session 데이터:" , session)

    if (session?.accessToken) {
      fetch("http://localhost:8080/auth/login/kakao", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: session.accessToken }),
      })
      .then((res) => res.json())
      .then((data) => console.log("쿠키 설정 완료", data))
      .catch((err) => console.error("쿠키 설정 실패", err))
    }
  }, [session])

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
            onClick={handleLogin}> 로그인
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