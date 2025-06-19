import { useEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import type { messageContent } from "./Message/Message";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useSocketContext } from "~/context/SocketContext";
import { useSettingsContext } from "~/context/SettingsContext";
import { useAuthContext } from "~/context/AuthContext";
import useAPI from "~/hook/useAPI";

interface MessageAreaProps {
  MobileSideMenuState: boolean;
  setMobileSideMenu: (MobileSideMenuState: boolean) => void;
}

interface rawMessage {
  content: string;
  creation_time: string;
  file: string;
  id: number;
  profile_id: number;
  read_time: null;
}

const MessageArea: React.FC<MessageAreaProps> = ({ setMobileSideMenu, MobileSideMenuState }) => {
  const { id, accessToken } = useAuthContext();
  const { typeID, convID } = useParams();
  const { name, surname } = useSettingsContext();
  const { openMessage, errorMessage, closeMessage, newMessage } = useSocketContext();
  const { isMobile } = useMobileContext();
  const [messageFeed, setMessageFeed] = useState<messageContent[]>([]);

  // export interface messageContent {
  //   messageInfos: {
  //     date?: string;
  //     type?: string;
  //     sender?: string;
  //     target?: string;
  //     room?: string;
  //   };
  //   authorName: string;
  //   authorSurname: string;
  //   authorLink?: string;
  //   authorImg?: string;
  //   authorMessage: {
  //     messageText?: string;
  //     messageCode?: string;
  //     messageEvent?: string;
  //     messageFile?: {
  //       fileLink: string;
  //       filePicture: string;
  //       fileName: string;
  //     };
  //   };
  // }

  useEffect(() => {
    if (convID != "0") {
      const fetchFeed = async () => {
        let displayedFeed: messageContent[] = [];
        const feed = await useAPI<rawMessage[]>("/chat/messages", { json: { origin: id?.toString(), target: convID }, token: accessToken });
        const rawMessages = feed.data;

        for (let i = 0; i < rawMessages.length; i++) {
          const message: messageContent = {
            messageInfos: {
              date: rawMessages[i].creation_time,
              type: "message",
              sender: rawMessages[i].profile_id.toString(),
            },
            authorName: "",
            authorSurname: "",
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
