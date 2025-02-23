import { instance } from "./axios";

export const getMyData = async () => {
  try {
    const res = await instance.get("/auth/me");
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
