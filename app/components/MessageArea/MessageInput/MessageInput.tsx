import { useState, type FormEvent } from "react";
import { useSocketContext } from "~/context/SocketContext";
import type { messageContent } from "../Message/Message";
import { useSettingsContext } from "~/context/SettingsContext";
import { useAuthContext } from "~/context/AuthContext";
import { useParams } from "react-router";
import useAPI from "~/hook/useAPI";

const MessageInput = () => {
  const { accessToken, id } = useAuthContext();
  const { typeID, convID } = useParams();
  const { name, surname, picture } = useSettingsContext();
  const { setNewMessage, socketRef } = useSocketContext();

  const [pendingMessage, setPendingMessage] = useState<null | messageContent>(null);

  const setMessage = (message: string) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    setPendingMessage({
      messageInfos: {
        isFromSocket: true,
        isForGroup: typeID == "dm" ? false : typeID,
        date: formattedDate,
        type: "message",
        sender: id?.toString(),
        target: convID,
      },
      authorName: name,
      authorSurname: surname,
      authorLink: "",
      authorImg: picture as string,
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

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    // Refresh client
    setNewMessage(pendingMessage);

    // Send to socket server
    if (socketRef && socketRef.current) {
      socketRef.current.send(JSON.stringify(pendingMessage));
    }

    // Send to http server
    const sendToHttp = async () => {
      await useAPI("/chat/message", { json: { pendingMessage }, token: accessToken });
    };
    sendToHttp();

    // Empty input
    const input = document.querySelector(".message-container__input") as HTMLInputElement;
    input.value = "";
  };

  return (
    <form onSubmit={sendMessage} className="message-container__input-container">
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
