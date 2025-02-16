import { instance } from "./axios";

export const getCard = async ({ memberId }: any) => {
  try {
    const res = instance.get(`/checklist/large-cat-item?memberId=${memberId}`);
    return res;
  } catch (e) {
    console.error(e);
  }
};
