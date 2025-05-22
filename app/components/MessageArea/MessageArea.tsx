import { useEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import type { messageContent } from "./Message/Message";
import { useMobileContext } from "~/context/MobileContext";

interface MessageAreaProps {
  typeID: string | undefined;
  convID: string | undefined;
  activeConversation: string;
  MobileSideMenuState: boolean;
  setMobileSideMenu: (MobileSideMenuState: boolean) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({ setMobileSideMenu, MobileSideMenuState, activeConversation, typeID, convID }) => {
  const [messageFeed, setMessageFeed] = useState<messageContent[]>([]);

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
        <div className="message-area__mobile-burger-button" onClick={() => handleMobileSideMenu(MobileSideMenuState)}>
          <i className="fa-solid fa-bars" />
        </div>
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
