import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  pic: string;
  status: boolean;
  activeConversation: string;
  setActiveConversation: (selectedConversation: string) => void;
}

const UserItem: React.FC<UserProps> = ({ name, pic, status, activeConversation, setActiveConversation }) => {
  const { isMobile } = useMobileContext();

  return (
    <div
      className={`user${activeConversation === name ? " active-user" : ""}`}
      onClick={() => {
        setActiveConversation(name);
      }}
    >
      <div className="user__img-container">
        <img className="user__img" src={pic} alt="utilisateur 1" />
        <span className={`connection__dot ${status ? "connected" : "disconnected"}`}></span>
      </div>
      {!isMobile && <p className="user__name">{name}</p>}
    </div>
  );
};

export default UserItem;
