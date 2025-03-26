import { useEffect, useState } from "react";

interface UserProps {
  name: string;
  pic: string;
  status: boolean;
}

const UserItem: React.FC<UserProps> = ({ name, pic, status }) => {
  const [activeConversation, setActiveConversation] = useState("");

  const handleActiveConversation = () => {};

  const [isMobile, setIsMobile] = useState(window.innerWidth > 700);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="user" onClick={handleActiveConversation}>
      <div className="user__img-container">
        <img className="user__img" src={pic} alt="utilisateur 1" />
        <span className={`connection__dot ${status ? "connected" : "disconnected"}`}></span>
      </div>
      {isMobile && <p className="user__name">{name}</p>}
    </div>
  );
};

export default UserItem;
