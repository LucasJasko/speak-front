import type React from "react";
import { useNavigate, useParams } from "react-router";
import { useMobileContext } from "~/context/MobileContext";

export interface RoomProps {
  id: string;
  name: string;
  icon: React.ReactElement;
  groupID: string;
  onClick: (e: boolean) => void;
}

const Room: React.FC<RoomProps> = ({ id, name, icon, onClick }) => {
  const navigate = useNavigate();
  const { isMobile } = useMobileContext();
  const { typeID, convID } = useParams();

  return (
    <div
      className={`room${convID === id ? " active-room" : ""}`}
      onClick={() => {
        navigate(`/home/${typeID}/${id}`);
        if (isMobile) {
          onClick(false);
        }
      }}
    >
      {icon}
      {!isMobile && name}
    </div>
  );
};

export default Room;
