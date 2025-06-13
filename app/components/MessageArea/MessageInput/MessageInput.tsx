import { useState } from "react";
import { useSocketContext } from "~/context/SocketContext";

const MessageInput = () => {
  const [pendingMessage, setPendingMessage] = useState("");
  const { setNewMessage, socketRef } = useSocketContext();

  const clearPendingMessage = () => {
    const input = document.querySelector(".message-container__input") as HTMLInputElement;
    input.value = "";
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setNewMessage(pendingMessage);
        socketRef?.current?.send(pendingMessage);
        clearPendingMessage();
      }}
      className="message-container__input-container"
    >
      <input
        onChange={(e) => {
          setPendingMessage(e.target.value);
        }}
        className="message-container__input"
        type="text"
        name="message"
        placeholder="Entrez votre message..."
      />
      <div className="message-container__link-container">
        <i className="fa-solid fa-file-arrow-up"></i>
        <i className="fa-solid fa-code"></i>
        <i className="fa-solid fa-calendar-plus"></i>
      </div>
    </form>
  );
};

export default MessageInput;
