import { useEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import type { messageContent } from "./Message/Message";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";

interface MessageAreaProps {
  MobileSideMenuState: boolean;
  setMobileSideMenu: (MobileSideMenuState: boolean) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({ setMobileSideMenu, MobileSideMenuState }) => {
  const { typeID, convID } = useParams();
  const [messageFeed, setMessageFeed] = useState<messageContent[]>([]);

  function parseMessage(message: string) {
    let msg = { type: "", sender: "", text: "" };
    try {
      msg = JSON.parse(message);
    } catch (e) {
      return false;
    }

    return msg;
  }

  function appendMessage(message: string) {
    let msgContainer = document.querySelector(".message-area__feed");
    let parsedMessage;

    if ((parsedMessage = parseMessage(message))) {
      // Ajouter le message à la discussion
      console.log("appending message...");
      console.log(parsedMessage);
    }
  }

  const { isMobile } = useMobileContext();

  // useEffect(() => {
  //   const data = async () => {
  //     try {
  //       const response = await fetch("http://alert-mns-back/getConv.php", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ typeID, convID }),
  //       });
  //       const data = await response.json();
  //       setMessageFeed(Array.from(JSON.parse(data)));
  //     } catch (error) {
  //       console.error("Erreur lors du chargement du fichier JSON :", error);
  //     }
  //   };
  //   data();
  // }, [activeConversation]);

  const handleMobileSideMenu = (MobileSideMenuState: boolean) => {
    MobileSideMenuState ? setMobileSideMenu(false) : setMobileSideMenu(true);
  };

  return (
    <div className="message-area">
      {!isMobile && <span className="message-area__drag-bar" />}
      {isMobile && (
        <button className="message-area__mobile-burger-button" onClick={() => handleMobileSideMenu(MobileSideMenuState)}>
          <i className="fa-solid fa-bars" />
        </button>
      )}
      <ul className="message-area__feed">
        {messageFeed.map((message, index) => (
          <Message
            key={index}
            authorLink={message.authorLink}
            authorName={message.authorName}
            messageDate={message.messageDate}
            authorImg={message.authorImg}
            authorMessage={message.authorMessage}
          />
        ))}
      </ul>
      <div className="message-area__input-area">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageArea;
