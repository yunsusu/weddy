import kakaoLogo from "@/../public/icons/kakaoTalk.svg";
import logoImg from "@/../public/images/Workspace Logo.svg";
import classNames from "classnames/bind";
import Image from "next/image";
import styles from "./style.module.scss";

const cn = classNames.bind(styles);

export default function LogIn() {
  function loginWithKakao() {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENTID;
    const redirectUri = "http://localhost:3000";

    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }

  return (
    <div className={cn("logInWrap")}>
      <div className={cn("logInWeddy")}>
        <Image src={logoImg} alt="웨디 로고" width={130} height={95} />
        <p className={cn("weddyIntro")}>
          결혼 준비의 시작, <br />
          <span className={cn("weddySpan")}>웨디</span>와 함께 하세요.
        </p>
      </div>
      <button className={cn("LoginBtn")} onClick={loginWithKakao}>
        <Image src={kakaoLogo} alt="카카오톡 로고" width={25} height={25} />
        <p className={cn("LogInP")}>카카오톡으로 로그인하기</p>
      </button>
    </div>
  );
}
