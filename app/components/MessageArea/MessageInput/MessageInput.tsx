import { useState } from "react";
import { useSocketContext } from "~/context/SocketContext";
import type { messageContent } from "../Message/Message";
import { useSettingsContext } from "~/context/SettingsContext";
import { useAuthContext } from "~/context/AuthContext";

const MessageInput = () => {
  const { id } = useAuthContext();
  const { name, surname } = useSettingsContext();
  const { setNewMessage, socketRef } = useSocketContext();

  const [pendingMessage, setPendingMessage] = useState<null | messageContent>(null);

  const setMessage = (message: string) => {
    setPendingMessage({
      messageInfos: {
        date: Date.now().toString(),
        type: "message",
        sender: id?.toString(),
      },
      authorName: name + " " + surname,
      authorLink: "",
      authorImg: "",
      authorMessage: {
        messageText: message,
        messageCode: "",
        messageEvent: "",
        messageFile: {
          fileLink: "",
          filePicture: "",
          fileName: "",
        },
      },
    });
  };

  const clearPendingMessage = () => {
    const input = document.querySelector(".message-container__input") as HTMLInputElement;
    input.value = "";
  };

  const sendMessage = () => {
    setNewMessage(pendingMessage);
    if (socketRef && socketRef.current) {
      socketRef.current.send(JSON.stringify(pendingMessage));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
        clearPendingMessage();
      }}
      className="message-container__input-container"
    >
      <input
        onChange={(e) => {
          setMessage(e.target.value);
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
