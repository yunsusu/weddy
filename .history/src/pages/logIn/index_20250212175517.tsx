import styles from './style.module.scss';
import classNames from 'classnames';
import logoImg from '@/../public/images/Workspace Logo.svg'
import kakaoLogo from '@/../public/icons/kakaoTalk.svg'
import Image from 'next/image';

const cn = classNames.bind(styles);

export default function LogIn() {
  return(
    <div className=''>
      <div>
        <Image src={logoImg} alt='웨디 로고' width={130} height={95} />
        <p>
          결혼 준비의 시작, <br />
          <span>웨디</span>와 함께 하세요.
        </p>
      </div>
      <button>
        <Image src={kakaoLogo} alt='카카오톡 로고' width={25} height={25} />
        <p>카카오톡으로 로그인하기</p>
      </button>
    </div>
  );
};