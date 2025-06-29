import { useEffect } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { useConvContext } from "~/context/ConvContext";
import { useSettingsContext } from "~/context/SettingsContext";
import type { messageContent } from "~/interfaces/MessageContent";

const Message: React.FC<messageContent> = ({ messageHeaders, messageBody }) => {
  const { convID } = useParams();
  const { b64Picture, setB64Picture } = useSettingsContext();
  const { convPicture, convParams } = useConvContext();

  // TODO voir pourquoi les var conv ne prennet pas de valeurs
  if (convParams && convPicture) {
    return (
      <li className="message">
        <div className="message__author">
          <a
            onClick={(e) => {
              e.preventDefault();
              console.log("Profile");
            }}
          >
            <img src={messageHeaders.sender == "Speak" ? "/assets/img/Speak_64x64.png" : `data:image/webp;base64,${b64Picture}`} alt="User profile picture" />
          </a>
        </div>
        <div className="message__container">
          <div className="message__header">
            <h3 className="message__author-name">{convParams.name}</h3>
            {messageHeaders.date && <span className="message__date">{messageHeaders.date}</span>}
          </div>
          <div className="message__content">
            {messageBody.text && <p className="message__text">{messageBody.text}</p>}
            {messageBody.code && <pre className="message__code">{messageBody.code}</pre>}
            {messageBody.file && (
              <a href={messageBody.file.link} className="message__file">
                {messageBody.file.picture}
                {messageBody.file.name}
              </a>
            )}
            {messageBody.event && <p className="message__event">{messageBody.event}</p>}
          </div>
        </div>
      </li>
    );
  }
};

export default Message;
