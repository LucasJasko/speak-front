import { useEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useSocketContext } from "~/context/SocketContext";
import { useAuthContext } from "~/context/AuthContext";
import useAPI from "~/hook/useAPI";
import type { messageContent } from "~/interfaces/MessageContent";
import type { MessageAreaProps } from "~/interfaces/MessageAreaProps";
import { useSettingsContext } from "~/context/SettingsContext";
import { useConvContext } from "~/context/ConvContext";

const MessageArea: React.FC<MessageAreaProps> = ({ setMobileSideMenu, MobileSideMenuState }) => {
  const { convID } = useParams();

  const { isMobile } = useMobileContext();
  const { id, accessToken } = useAuthContext();
  const { messageFeed, setMessageFeed } = useSettingsContext();
  const { openMessage, errorMessage, closeMessage, newMessage } = useSocketContext();

  useEffect(() => {
    if (convID != "0" && id != undefined) {
      const fetchFeed = async () => {
        const { data } = await useAPI<messageContent[]>("/chat/messages", { json: { origin: id.toString(), target: convID }, token: accessToken });
        setMessageFeed(data);
      };
      fetchFeed();
    }
  }, [convID, id]);

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

  useEffect(() => {
    const feed = document.querySelector(".message-area__feed") as HTMLElement;
    const bottom = feed.scrollHeight;
    feed.scrollTo({ top: bottom });
  }, [messageFeed]);

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
          <Message key={index} messageHeaders={message.messageHeaders} messageBody={message.messageBody} />
        ))}
      </ul>
      <div className="message-area__input-area">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessageArea;
