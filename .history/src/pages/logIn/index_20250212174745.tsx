import styles from './style.module.scss';
import classNames from 'classnames';
import logoImg from '@/../public/images/Workspace Logo.svg'
import Image from 'next/image';

const cn = classNames.bind(styles);

export default function LogIn() {
  return(
    <div>
      <div>
        <Image src={logoImg}></Image>
        <p></p>
      </div>
    </div>
  );
};