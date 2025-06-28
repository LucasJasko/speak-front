import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useConvContext } from "~/context/ConvContext";
import { useMobileContext } from "~/context/MobileContext";
import { useSettingsContext } from "~/context/SettingsContext";
import type { UserProps } from "~/interfaces/UserProps";

const UserItem: React.FC<UserProps> = ({ userID, status, convName, pictureSetings, initConversation }) => {
  const navigate = useNavigate();

  const { typeID, convID } = useParams();
  const { fetchProfilePicture, setMessageFeed, lastConvId } = useSettingsContext();
  const { isMobile } = useMobileContext();

  const [userPicture, setUserPicture] = useState<string>("");

  useEffect(() => {
    fetchProfilePicture(pictureSetings).then((picture) => {
      setUserPicture(picture);
    });
  }, []);

  function processNavigation() {
    navigate(`/home/${typeID}/${userID}`);
    if (initConversation) {
      initConversation(convID);
    }

    if (convID && lastConvId != convID.toString()) {
      setMessageFeed([]);
    }
  }

  return (
    <div className={`user${userID === convID ? " active-user" : ""}`} onClick={processNavigation}>
      <div className="user__img-container">
        <img className="user__img" src={userPicture == "" ? "/assets/img/Speak_64x64.png" : "data:image/webp;base64," + userPicture} alt="photo utilisateur" />
        <span className={`connection__dot ${status == "1" ? "connected" : "disconnected"}`}></span>
      </div>
      {!isMobile && <p className="user__name">{convName}</p>}
    </div>
  );
};

export default UserItem;
