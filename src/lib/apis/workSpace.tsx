import { instance } from "./axios";

export const getMember = async (memberId: any) => {
  try {
    const res = await instance.get(`/checklist?memberId=${memberId}`);
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

export const getItem = async (checklistId: any, largeCatItemId:any, smallCatItemId: any) => {
  try {
    const res = await instance.get(
      `/checklist/large-cat-item/small-cat-Item/item`, {
        params: {
          checklistId,
          largeCatItemId,
          smallCatItemId
        }
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

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await instance.post('/api/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('파일 업로드 응답:', response.data);
    if (response.data) {
      if (typeof response.data === 'string') {
        return response.data;
      }

      if (typeof response.data === 'object') {
        if (response.data.file) return response.data.file;
        if (response.data.url) return response.data.url;
        if (response.data.fileUrl) return response.data.fileUrl;
      }
    }
    console.error('예상치 못한 응답 형식:', response.data);
    return response.data.file;
  } catch (error) {
    console.error("파일 업로드 에러:", error);
    throw error;
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
