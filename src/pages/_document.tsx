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
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <KakaoScript />
    </Html>
  );
}
