import { useState } from "react";

interface UserProps {
  name: string;
  pic: string;
  status: boolean;
}

const UserItem: React.FC<UserProps> = ({ name, pic, status }) => {
  const [activeConversation, setActiveConversation] = useState("");

  const handleActiveConversation = () => {};

  return (
    <div className="user" onClick={handleActiveConversation}>
      <div className="user__img-container">
        <img className="user__img" src={pic} alt="utilisateur 1" />
        <span className={`connection__dot ${status ? "connected" : "disconnected"}`}></span>
      </div>
      <p className="user__name">{name}</p>
    </div>
  );
};

export default UserItem;
