import type React from "react";

export interface messageContent {
  messageInfos: {
    date?: string;
    type?: string;
    sender?: string;
  };
  authorName: string;
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

const Message: React.FC<messageContent> = ({ authorLink, authorName, messageInfos, authorImg, authorMessage }) => {
  return (
    <li className="message">
      <div className="message__author">
        <a href={authorLink}>{authorImg && <img src={authorImg} alt="User img" />}</a>
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
