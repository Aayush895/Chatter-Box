import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    isMessageComponentVisible: false,
    senderId: null,
    receiverId: null,
    chatMessage: {
      senderId: null,
      receiverId: null,
      messageType: 'text',
      messageContent: '',
      attachmentURL: '',
      attachmentName: '',
    },
  },
  reducers: {
    showMessageComponent: function (state) {
      state.isMessageComponentVisible = true;
    },

    // TODO: Need to check if this function is required or not
    sendMessage: function (state, messageData) {
      //   TODO: If any issue with sending message then manually assign the data in the objects
      state.chatMessage = messageData.payload;
    },
    getSenderId: function (state, senderId) {
      state.senderId = senderId;
    },
    getReceiverId: function (state, receiverId) {
      state.receiverId = receiverId;
    },
  },
});

export const { showMessageComponent, sendMessage, getSenderId, getReceiverId } =
  messagesSlice.actions;

export default messagesSlice.reducer;
