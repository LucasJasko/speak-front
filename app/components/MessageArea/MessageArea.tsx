import { useEffect, useLayoutEffect, useState } from "react";
import MessageInput from "./MessageInput/MessageInput";
import Message from "./Message/Message";
import type { messageContent } from "./Message/Message";

const MessageArea = () => {
  const [messageFeed, setMessageFeed] = useState<messageContent[]>([]);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await fetch("/message.json");
        const data = await response.json();
        setMessageFeed(data);
      } catch (error) {
        console.error("Erreur lors du chargement du fichier JSON :", error);
      }
    };

    data();
  }, []);
  return (
    <div className="message-area">
      <span className="message-area__drag-bar"></span>
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
