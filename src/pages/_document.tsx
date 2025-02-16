import { Head, Html, Main, NextScript } from "next/document";
import KakaoScript from "@/components/commons/KakaoScript";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function Document({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Html lang="ko">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <KakaoScript />
    </Html>
  );
}
