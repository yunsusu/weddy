import { instance } from "./axios";

export const getMember = async (memberId: any) => {
  try {
    const res = await instance.get(`/checklist/?memberId=${memberId}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getCard = async (memberId: any) => {
  try {
    const res = await instance.get(
      `/checklist/large-cat-item?memberId=${memberId}`
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const postCard = async (memberId: any, title: string) => {
  try {
    const res = instance.post(`/checklist/large-cat-item`, {
      memberId: memberId,
      title: title,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const deleteCard = async (memberId: any, id: any) => {
  try {
    const res = await instance.delete(`/checklist/large-cat-item/delete`, {
      data: { memberId, id },
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};
