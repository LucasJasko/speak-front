import type React from "react";

interface messageContent {
  authorLink: string;
  authorName: string;
  messageDate: string;
  authorImg: string;
  authorMessage: {
    authorMessageText?: string;
    authorMessageCode?: string;
    authorMessageEvent?: string;
    authorMessageFile?: {
      authorMessageFileLink: string;
      authorMessageFilePicture: string;
      authorMessageFileName: string;
    };
  };
}

const Message: React.FC<messageContent> = ({ authorLink, authorName, messageDate, authorImg, authorMessage }) => {
  return (
    <li className="message">
      <div className="message__author">
        <a href={authorLink}>
          <img src={authorImg} alt="User img" />
        </a>
      </div>
      <div className="message__container">
        <div className="message__header">
          <h3 className="message__author-name">{authorName}</h3>
          <span className="message__date">{messageDate}</span>
        </div>
        <p className="message__content">
          {authorMessage.authorMessageText && <p className="message__text">{authorMessage.authorMessageText}</p>}
          {authorMessage.authorMessageCode && <pre className="message__code">{authorMessage.authorMessageCode}</pre>}
          {authorMessage.authorMessageFile && (
            <a href={authorMessage.authorMessageFile.authorMessageFileLink} className="message__file">
              {authorMessage.authorMessageFile.authorMessageFilePicture}
              {authorMessage.authorMessageFile.authorMessageFileName}
            </a>
          )}
          {authorMessage.authorMessageEvent && <p className="message__event">{authorMessage.authorMessageEvent}</p>}
        </p>
      </div>
    </li>
  );
};

export default Message;
