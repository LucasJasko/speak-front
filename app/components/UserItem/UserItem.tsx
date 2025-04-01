import { useMobileContext } from "~/context/MobileContext";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
  convID: string;
  convName: string;
  pic: string;
  status: boolean;
  activeConversation: string;
  setActiveConversation: (convID: string) => void;
}

const UserItem: React.FC<UserProps> = ({ convName, pic, status, activeConversation, convID, setActiveConversation }) => {
  const { isMobile } = useMobileContext();

  return (
    <div
      className={`user${activeConversation === convID ? " active-user" : ""}`}
      onClick={() => {
        setActiveConversation(convID);
      }}
    >
      <div className="user__img-container">
        <img className="user__img" src={pic} alt="photo utilisateur" />
        <span className={`connection__dot ${status ? "connected" : "disconnected"}`}></span>
      </div>
      {!isMobile && <p className="user__name">{convName}</p>}
    </div>
  );
};

export default UserItem;
