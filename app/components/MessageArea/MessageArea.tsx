import MessageInput from "./MessageInput/MessageInput";

const MessageArea = () => {
  return (
    <div className="message">
      <span className="message__drag-bar"></span>
      <div className="message__feed"></div>
      <div className="message__input-area">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageArea;
