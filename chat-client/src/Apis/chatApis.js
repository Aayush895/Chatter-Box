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
