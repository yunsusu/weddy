import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "src/styles")], // ✅ styles 폴더 추가
  //   additionalData: `@use "@/styles/main.scss" as *;`, // ✅ SCSS 파일 자동 추가
  // },
};

export default nextConfig;
