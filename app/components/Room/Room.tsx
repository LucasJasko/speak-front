import type React from "react";
import { useNavigate, useParams } from "react-router";
import { useMobileContext } from "~/context/MobileContext";

interface RoomProps {
  roomID: string;
  roomName: string;
  roomIcon: React.ReactElement;
}

const Room: React.FC<RoomProps> = ({ roomID, roomName, roomIcon }) => {
  const navigate = useNavigate();
  const { isMobile } = useMobileContext();
  const { convID } = useParams();

  return (
    <div className={`room${convID === roomID ? " active-room" : ""}`} onClick={() => navigate(`${roomID}/${roomID}`)}>
      {roomIcon}
      {!isMobile && roomName}
    </div>
  );
};

export default Room;
