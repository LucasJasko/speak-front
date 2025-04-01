import type React from "react";
import { useParams } from "react-router";
import { useMobileContext } from "~/context/MobileContext";

interface RoomProps {
  roomName: string;
  roomIcon: React.ReactElement;
  activeRoom: string;
  setActiveRoom: (roomName: string) => void;
  setRoomId: (roomId: string) => void;
}

const Room: React.FC<RoomProps> = ({ roomName, roomIcon, activeRoom, setActiveRoom }) => {
  const { roomId } = useParams();
  const { isMobile } = useMobileContext();

  return (
    <div className={`room${activeRoom === roomName ? " active-room" : ""}`} onClick={() => setActiveRoom(roomName)}>
      {roomIcon}
      {!isMobile && roomName}
    </div>
  );
};

export default Room;
