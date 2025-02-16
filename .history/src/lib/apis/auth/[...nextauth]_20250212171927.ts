import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
    interface Session {
      accessToken?: string; // ✅ accessToken 속성 추가
    }

    interface JWT {
      accessToken?: string; // ✅ JWT에도 accessToken 추가
    }
}

export default NextAuth({
    providers: [
        KakaoProvider({
            clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});