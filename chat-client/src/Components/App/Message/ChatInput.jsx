import { useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiAttachment2 } from 'react-icons/ri';
import { IoIosSend, IoMdPhotos } from 'react-icons/io';
import { IoDocumentSharp } from 'react-icons/io5';
import { getSentMessage } from '../../../Slices/messagesSlice';
import { useFileUploadMutation } from '../../../Hooks/Mutations/useFileUploadMutation';
import UserContext from '../../../Context/UserContext';

function ChatInput() {
  const [textMessage, setTextMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [showChatOptions, setshowChatOptions] = useState(false);
  const dispatch = useDispatch();

  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const senderId = useSelector((state) => state.messages.senderId);
  const receiverId = useSelector((state) => state.messages.receiverId);

  const fileUploadMutation = useFileUploadMutation();
  const { userInfo } = useContext(UserContext);

  function handleSendMessage(e) {
    e.preventDefault();
    const hasAttachment = attachment && textMessage.includes(attachment.url);

    const messageToSend = {
      senderId: senderId.payload,
      receiverId: receiverId.payload,
      messageType: hasAttachment ? attachment.type : 'text',
      messageContent: textMessage,
      attachmentURL: hasAttachment ? attachment.url : '',
      attachmentName: hasAttachment ? attachment.name : '',
    };

    dispatch({ type: 'messages/sendMessage', payload: messageToSend });
    dispatch(getSentMessage(textMessage));
    setTextMessage('');
    setAttachment(null);
  }

  function handleTextMessage(e) {
    e.preventDefault();
    setTextMessage(e.target.value);
  }

  function handleShowChatOptions() {
    setshowChatOptions((prev) => !prev);
  }

  function handlePhotoUpload() {
    imageInputRef.current.click();
    setshowChatOptions(false);
  }

  function handleDocumentUpload() {
    documentInputRef.current.click();
    setshowChatOptions(false);
  }

  function handleFileSelected(e, fieldName) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(fieldName, file);

    fileUploadMutation.mutate(
      { accessToken: userInfo.accessToken, formData },
      {
        onSuccess: (response) => {
          const uploaded = response.data;
          setTextMessage((prev) =>
            prev ? `${prev} ${uploaded.secure_url}` : uploaded.secure_url
          );
          setAttachment({
            url: uploaded.secure_url,
            name: file.name,
            type: fieldName,
          });
        },
      }
    );

    e.target.value = '';
  }

  return (
    <>
      <form className="flex items-center shrink-0 gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-3.5 bg-[#1A1628] border-t border-[#2C2640] pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="dropdown dropdown-top">
          <button
            type="button"
            aria-label="Attach file"
            onClick={handleShowChatOptions}
            className="shrink-0 p-1 text-[#6B6480] hover:text-[#F3F1F7] cursor-pointer"
          >
            <RiAttachment2 size={20} />
          </button>
          {showChatOptions && (
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-[#241E38] rounded-box z-1 w-52 p-2 mb-2 shadow-sm border border-[#2C2640]"
            >
              <li>
                <button type="button" onClick={handlePhotoUpload}>
                  <IoMdPhotos className="text-lg shrink-0" />
                  Send a photo
                </button>
              </li>
              <li>
                <button type="button" onClick={handleDocumentUpload}>
                  <IoDocumentSharp className="text-lg shrink-0" />
                  Send a document
                </button>
              </li>
            </ul>
          )}
        </div>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFileSelected(e, 'image')}
        />
        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          hidden
          onChange={(e) => handleFileSelected(e, 'document')}
        />

        <input
          type="text"
          placeholder="Type here"
          value={textMessage}
          onChange={handleTextMessage}
          className="input flex-1 min-w-0 bg-[#14111F] border border-[#2C2640] rounded-[10px] text-[#F3F1F7] placeholder:text-[#6B6480]"
        />
        <button
          type="button"
          aria-label="Send message"
          onClick={handleSendMessage}
          className="btn btn-square shrink-0 bg-[#FF6B4D] text-[#4A1B0C] w-8.5 h-8.5 rounded-[10px] flex items-center justify-center hover:opacity-90"
        >
          <IoIosSend size={25} />
        </button>
      </form>
    </>
  );
}

export default ChatInput;
