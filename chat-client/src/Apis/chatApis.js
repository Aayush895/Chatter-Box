import axiosInstance from './axiosConfig';

export async function fetchChats(accessToken, senderId, receiverId) {
  const serverResponse = await axiosInstance.get(
    `/chats?senderId=${senderId}&receiverId=${receiverId}`,
    {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    }
  );

  return serverResponse.data;
}

export async function uploadDocument(accessToken, formData) {
  const serverResponse = await axiosInstance.post(`/upload`, formData, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });

  return serverResponse.data;
}
