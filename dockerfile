# 1. Node.js 이미지 기반으로 시작
FROM node:18-alpine
# 2. 작업 디렉토리 설정
WORKDIR /frontt
# 3. package.json과 package-lock.json 복사
COPY . /frontt
COPY package*.json ./
# 4. 의존성 설치
RUN npm install
# 6. Next.js 앱 빌드
RUN npm run build
# 5. 앱 소스 코드 복사
COPY . .
# 7. 앱 실행 (개발/프로덕션 모드)
CMD ["npm", "run", "dev"]
# 8. 환경 변수 설정하기
# ENV NEXT_PUBLIC_APP_KEY="your_key_here"