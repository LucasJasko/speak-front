import { useEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import type { messageContent } from "./Message/Message";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useSocketContext } from "~/context/SocketContext";
import { useSettingsContext } from "~/context/SettingsContext";
import { useAuthContext } from "~/context/AuthContext";

interface MessageAreaProps {
  MobileSideMenuState: boolean;
  setMobileSideMenu: (MobileSideMenuState: boolean) => void;
}

const MessageArea: React.FC<MessageAreaProps> = ({ setMobileSideMenu, MobileSideMenuState }) => {
  const { id } = useAuthContext();
  const { typeID, convID } = useParams();
  const { name, surname } = useSettingsContext();
  const { openMessage, errorMessage, closeMessage, newMessage } = useSocketContext();
  const { isMobile } = useMobileContext();
  const [messageFeed, setMessageFeed] = useState<messageContent[]>([]);

  useEffect(() => {
    if (openMessage != null) {
      setMessageFeed((prev) => [...prev, openMessage]);
    }
  }, [openMessage]);

  useEffect(() => {
    if (newMessage != null) {
      setMessageFeed((prev) => [...prev, newMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    if (closeMessage != null) {
      setMessageFeed((prev) => [...prev, closeMessage]);
    }
  }, [closeMessage]);

  useEffect(() => {
    if (errorMessage != null) {
      setMessageFeed((prev) => [...prev, errorMessage]);
    }
  }, [errorMessage]);

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
            messageInfos={message.messageInfos}
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
