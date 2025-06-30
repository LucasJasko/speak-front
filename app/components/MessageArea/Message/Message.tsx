import { useEffect } from "react";
import { useAuthContext } from "~/context/AuthContext";
import { useConvContext } from "~/context/ConvContext";
import { useSettingsContext } from "~/context/SettingsContext";
import type { messageContent } from "~/interfaces/MessageContent";

const Message: React.FC<messageContent> = ({ messageHeaders, messageBody }) => {
  const { b64Picture, setB64Picture } = useSettingsContext();
  const { id } = useAuthContext();
  const { name } = useSettingsContext();
  const { convPicture, convParams } = useConvContext();

  useEffect(() => {
    // console.log(messageHeaders);
    // console.log(messageBody);
    // console.log(convPicture);
    // console.log(convParams);
    // console.log(b64Picture);
    // console.log(messageHeaders.sender);
    // console.log(id.toString());
  }, []);

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
            <img
              src={
                messageHeaders.type != "message"
                  ? "/assets/img/Speak_64x64.png"
                  : `data:image/webp;base64,${messageHeaders.sender === id ? b64Picture : convPicture}`
              }
              alt="User profile picture"
            />
          </a>
        </div>
        <div className="message__container">
          <div className="message__header">
            <h3 className="message__author-name">{messageHeaders.type != "message" ? "Speak" : messageHeaders.sender === id ? name : convParams.name}</h3>
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
