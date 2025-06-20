import type React from "react";
import { useEffect, useState } from "react";
import { useSettingsContext } from "~/context/SettingsContext";

export interface messageContent {
  messageInfos: {
    date?: string;
    type?: string;
    sender?: string;
    target?: string;
    room?: string;
  };
  authorName: string;
  authorSurname: string;
  authorLink?: string;
  authorImg?: string;
  authorMessage: {
    messageText?: string;
    messageCode?: string;
    messageEvent?: string;
    messageFile?: {
      fileLink: string;
      filePicture: string;
      fileName: string;
    };
  };
}

const Message: React.FC<messageContent> = ({ authorLink, authorName, authorSurname, messageInfos, authorImg, authorMessage }) => {
  const { fetchProfilePicture } = useSettingsContext();
  const [authorPicture, setAuthorPicture] = useState<string>();

  useEffect(() => {
    const fetchimg = async () => {
      const id = messageInfos.sender;
      const pic = await fetchProfilePicture({ id, name: authorName, surname: authorSurname, picture: authorImg });
      setAuthorPicture(pic);
    };
    fetchimg();
  }, []);

  return (
    <li className="message">
      <div className="message__author">
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          href={""}
        >
          {authorPicture ? (
            <img src={"data:image/webp;base64," + authorPicture} alt="User profile picture" />
          ) : (
            authorImg && <img src={"data:image/webp;base64," + authorImg} alt="User profile picture" />
          )}
        </a>
      </div>
      <div className="message__container">
        <div className="message__header">
          {authorName && <h3 className="message__author-name">{authorName}</h3>}
          {messageInfos.date && <span className="message__date">{messageInfos.date}</span>}
        </div>
        <div className="message__content">
          {authorMessage.messageText && <p className="message__text">{authorMessage.messageText}</p>}
          {authorMessage.messageCode && <pre className="message__code">{authorMessage.messageCode}</pre>}
          {authorMessage.messageFile && (
            <a href={authorMessage.messageFile.fileLink} className="message__file">
              {authorMessage.messageFile.filePicture}
              {authorMessage.messageFile.fileName}
            </a>
          )}
          {authorMessage.messageEvent && <p className="message__event">{authorMessage.messageEvent}</p>}
        </div>
      </div>
    </li>
  );
};

export default Message;
