import { instance } from "./axios";

export const getMember = async (memberId: any) => {
  try {
    const res = await instance.get(`/checklist?memberId=${memberId}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getCard = async (memberId: any, itemStatus: string) => {
  try {
    if (itemStatus) {
      const res = await instance.get(
        `/checklist/large-cat-item?memberId=${memberId}&itemStatuses=${itemStatus}`
      );
      return res.data;
    } else {
      const res = await instance.get(
        `/checklist/large-cat-item?memberId=${memberId}`
      );
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getItem = async (
  checklistId: any,
  largeCatItemId: any,
  smallCatItemId: any
) => {
  try {
    const res = await instance.get(
      `/checklist/large-cat-item/small-cat-Item/item`,
      {
        params: {
          checklistId,
          largeCatItemId,
          smallCatItemId,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const postCard = async (memberId: any, title: string) => {
  try {
    const res = await instance.post(`/checklist/large-cat-item`, {
      memberId: memberId,
      title: title,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const changeCardName = async (
  memberId: any,
  id: any,
  newTitle: string
) => {
  try {
    const res = await instance.patch(`/checklist/large-cat-item`, {
      memberId: memberId,
      id: id,
      editedTitle: newTitle,
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const deleteCard = async (memberId: any, id: any) => {
  try {
    const res = await instance.patch(`/checklist/large-cat-item/delete`, {
      memberId,
      id,
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const addSmallCard = async (data: any) => {
  try {
    const res = await instance.post(
      `/checklist/large-cat-item/small-cat-Item/add-item`,
      data
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const moveSmallCard = async (data: any) => {
  try {
    const res = await instance.patch(
      `/checklist/large-cat-item/small-cat-Item/move-item`,
      data
    );
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postDday = async (data: any) => {
  try {
    const res = await instance.patch(`/checklist/me/d-day`, data);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const postFile = async (data: any) => {
  try {
    const res = await instance.post(`/api/files`, data);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const deleteFile = async (fileUrl: any) => {
  try {
    const urlWithoutQuery = fileUrl.split('?')[0];
    const filename = urlWithoutQuery.split('/').pop() || '';
    
    console.log("Deleting file with filename:", filename);
    
    const res = await instance.delete(`/api/files/${filename}`);
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const saveProfile = async (id: any, dat: any) => {
  try {
    const res = await instance.patch(`/member/${id}`, dat);
    return res;
  } catch (e) {
    console.error(e);
  }
};
