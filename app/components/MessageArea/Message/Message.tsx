import type { messageContent } from "~/interfaces/MessageContent";

const Message: React.FC<messageContent> = (m) => {
  return (
    <li className="message">
      <div className="message__author">
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          href={""}
        >
          {m.authorImg && <img src={`data:image/webp;base64,${m.authorImg}`} alt="User profile picture" />}
        </a>
      </div>
      <div className="message__container">
        <div className="message__header">
          {m.authorName && <h3 className="message__author-name">{m.authorName}</h3>}
          {m.messageInfos.date && <span className="message__date">{m.messageInfos.date}</span>}
        </div>
        <div className="message__content">
          {m.authorMessage.messageText && <p className="message__text">{m.authorMessage.messageText}</p>}
          {m.authorMessage.messageCode && <pre className="message__code">{m.authorMessage.messageCode}</pre>}
          {m.authorMessage.messageFile && (
            <a href={m.authorMessage.messageFile.fileLink} className="message__file">
              {m.authorMessage.messageFile.filePicture}
              {m.authorMessage.messageFile.fileName}
            </a>
          )}
          {m.authorMessage.messageEvent && <p className="message__event">{m.authorMessage.messageEvent}</p>}
        </div>
      </div>
    </li>
  );
};

export default Message;
