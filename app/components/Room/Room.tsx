import type React from "react";
import { useMobileContext } from "~/context/MobileContext";

interface RoomProps {
  roomID: string;
  roomName: string;
  roomIcon: React.ReactElement;
  activeRoom: string;
  setActiveRoom: (roomID: string) => void;
}

const Room: React.FC<RoomProps> = ({ roomID, roomName, roomIcon, activeRoom, setActiveRoom }) => {
  const { isMobile } = useMobileContext();

  return (
    <div className={`room${activeRoom === roomID ? " active-room" : ""}`} onClick={() => setActiveRoom(roomID)}>
      {roomIcon}
      {!isMobile && roomName}
    </div>
  );
};

export default Room;
