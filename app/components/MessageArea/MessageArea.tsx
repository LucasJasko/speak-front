import { useEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useSocketContext } from "~/context/SocketContext";
import { useSettingsContext } from "~/context/SettingsContext";
import { useAuthContext } from "~/context/AuthContext";
import useAPI from "~/hook/useAPI";
import type { messageContent } from "~/interfaces/MessageContent";
import type { MessageAreaProps } from "~/interfaces/MessageAreaProps";
import type { rawMessage } from "~/interfaces/RawMessage";

const MessageArea: React.FC<MessageAreaProps> = ({ setMobileSideMenu, MobileSideMenuState }) => {
  const { convID } = useParams();

  const { isMobile } = useMobileContext();
  const { id, accessToken } = useAuthContext();
  const { openMessage, errorMessage, closeMessage, newMessage } = useSocketContext();

  const [messageFeed, setMessageFeed] = useState<messageContent[]>([]);

  useEffect(() => {
    if (convID != "0") {
      // const fetchDefaultImg = async () => {
      //   return await fetch("./assets/img/Speak_64x64.png");
      // };

      const fetchFeed = async () => {
        let displayedFeed: messageContent[] = [];

        const feed = await useAPI<rawMessage[]>("/chat/messages", { json: { origin: id?.toString(), target: convID }, token: accessToken });
        const rawMessages = feed.data;

        for (let i = 0; i < rawMessages.length; i++) {
          const message: messageContent = {
            messageInfos: {
              isFromSocket: false,
              date: rawMessages[i].creation_time,
              type: "message",
              sender: rawMessages[i].profile_id.toString(),
            },
            authorImg: rawMessages[i].author_picture,
            authorName: rawMessages[i].author_name,
            authorSurname: rawMessages[i].author_surname,
            authorMessage: {
              messageText: rawMessages[i].content,
            },
          };
          displayedFeed[i] = message;
        }
        setMessageFeed(displayedFeed);
      };

      fetchFeed();
    }
  }, [convID]);

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
          <Message
            key={index}
            authorLink={message.authorLink}
            authorName={message.authorName}
            authorSurname={message.authorSurname}
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
