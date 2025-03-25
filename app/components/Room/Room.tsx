import type React from "react";

interface RoomProps {
  roomName: string;
  roomIcon: React.ReactElement;
}

const Room: React.FC<RoomProps> = ({ roomName, roomIcon }) => {
  return (
    <div className="room">
      {roomIcon}
      {roomName}
    </div>
  );
};

export default Room;
