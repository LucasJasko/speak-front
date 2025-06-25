import { useParams } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { useSettingsContext } from "~/context/SettingsContext";
import type { messageContent } from "~/interfaces/MessageContent";

const Message: React.FC<messageContent> = (m) => {
  const { convID } = useParams();
  const { id } = useAuthContext();
  const { b64Picture, profileDms } = useSettingsContext();

  return (
    <li className="message">
      <div className="message__author">
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          href={""}
        >
          {m.authorName == "Speak" && <img src="/assets/img/Speak_64x64.png" alt="User profile picture" />}
          {!m.messageInfos.isFromSocket && <img src={`data:image/webp;base64,${m.authorImg}`} alt="User profile picture" />}
          {m.messageInfos.isFromSocket &&
            m.authorName !== "Speak" &&
            (m.messageInfos.sender === id?.toString() ? <img src={`data:image/webp;base64,${b64Picture}`} alt="User profile picture" /> : "ok")}
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
