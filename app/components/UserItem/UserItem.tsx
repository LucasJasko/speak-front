import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMobileContext } from "~/context/MobileContext";
import { useSettingsContext } from "~/context/SettingsContext";
import type { UserProps } from "~/interfaces/UserProps";

const UserItem: React.FC<UserProps> = (up) => {
  const navigate = useNavigate();

  const { typeID, convID } = useParams();
  const { fetchProfilePicture } = useSettingsContext();
  const { isMobile } = useMobileContext();

  const [pic, setPic] = useState<string | undefined>("");

  useEffect(() => {
    fetchProfilePicture(up.pictureSetings).then((picture) => {
      setPic(picture);
    });
  }, []);

  return (
    <div
      className={`user${up.userID === convID ? " active-user" : ""}`}
      onClick={() => {
        navigate(`/home/${typeID}/${up.userID}`);
        if (up.initConversation) {
          up.initConversation(up.userID);
        }
      }}
    >
      <div className="user__img-container">
        <img className="user__img" src={pic == "" ? "/assets/img/Speak_64x64.png" : "data:image/webp;base64," + pic} alt="photo utilisateur" />
        <span className={`connection__dot ${up.status == "1" ? "connected" : "disconnected"}`}></span>
      </div>
      {!isMobile && <p className="user__name">{up.convName}</p>}
    </div>
  );
};

export default UserItem;
