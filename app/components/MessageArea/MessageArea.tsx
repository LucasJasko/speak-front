import { useEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import type { messageContent } from "./Message/Message";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useSocketContext } from "~/context/SocketContext";

interface MessageAreaProps {
  MobileSideMenuState: boolean;
  setMobileSideMenu: (MobileSideMenuState: boolean) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({ setMobileSideMenu, MobileSideMenuState }) => {
  const { typeID, convID } = useParams();
  const { openMessage, errorMessage, closeMessage, newMessage } = useSocketContext();
  const { isMobile } = useMobileContext();
  const [messageFeed, setMessageFeed] = useState<messageContent[]>([]);

  useEffect(() => {
    if (openMessage != "") {
      setMessageFeed((prev) => [...prev, { authorMessage: { authorMessageText: openMessage } }]);
    }
  }, [openMessage]);

  useEffect(() => {
    if (newMessage != "") {
      setMessageFeed((prev) => [...prev, { authorMessage: { authorMessageText: newMessage } }]);
      console.log(messageFeed);
    }
  }, [newMessage]);

  useEffect(() => {
    if (closeMessage != "") {
      setMessageFeed((prev) => [...prev, { authorMessage: { authorMessageText: closeMessage } }]);
    }
  }, [closeMessage]);

  useEffect(() => {
    if (errorMessage != "") {
      setMessageFeed((prev) => [...prev, { authorMessage: { authorMessageText: errorMessage } }]);
    }
  }, [errorMessage]);

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
