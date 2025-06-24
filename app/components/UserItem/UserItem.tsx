import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMobileContext } from "~/context/MobileContext";
import { useSettingsContext, type pictureProfileSettings } from "~/context/SettingsContext";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
  convName: string;
  userID: string;
  pictureSetings: pictureProfileSettings;
  status: string;
  initConversation?: (id: any) => void;
}

const UserItem: React.FC<UserProps> = ({ userID, convName, pictureSetings, status, initConversation }) => {
  const navigate = useNavigate();
  const { typeID, convID } = useParams();
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
      className={`user${userID === convID ? " active-user" : ""}`}
      onClick={() => {
        navigate(`/home/${typeID}/${userID}`);
        if (initConversation) {
          initConversation(userID);
        }
      }}
    >
      <div className="user__img-container">
        <img className="user__img" src={pic == "" ? "/assets/img/Speak_64x64.png" : "data:image/webp;base64," + pic} alt="photo utilisateur" />
        <span className={`connection__dot ${status == "1" ? "connected" : "disconnected"}`}></span>
      </div>
      {!isMobile && <p className="user__name">{convName}</p>}
    </div>
  );
};

export default UserItem;
