import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useSettingsContext, type pictureSettings } from "~/context/SettingsContext";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
  convID: string;
  convName: string;
  pictureSetings: pictureSettings;
  status: string;
  activeConversation: string;
  setActiveConversation: (convID: string) => void;
}

const UserItem: React.FC<UserProps> = ({ convName, pictureSetings, status, activeConversation, convID, setActiveConversation }) => {
  const { fetchProfilePicture } = useSettingsContext();
  const [pic, setPic] = useState<string | undefined>("");
  const { isMobile } = useMobileContext();

  useEffect(() => {
    fetchProfilePicture(pictureSetings).then((picture) => {
      setPic(picture);
    });
  }, []);

  return (
    <div
      className={`user${activeConversation === convID ? " active-user" : ""}`}
      onClick={() => {
        setActiveConversation(convID);
      }}
    >
      <div className="user__img-container">
        <img className="user__img" src={pic == "" ? "/assets/img/Speak_64x64.png" : "data:image/jpeg;base64," + pic} alt="photo utilisateur" />
        <span className={`connection__dot ${status == "1" ? "connected" : "disconnected"}`}></span>
      </div>
      {!isMobile && <p className="user__name">{convName}</p>}
    </div>
  );
};

export default UserItem;
