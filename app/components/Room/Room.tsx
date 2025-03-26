import type React from "react";
import { useEffect, useState } from "react";

interface RoomProps {
  roomName: string;
  roomIcon: React.ReactElement;
}

const Room: React.FC<RoomProps> = ({ roomName, roomIcon }) => {
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
    <div className="room">
      {roomIcon}
      {isMobile && roomName}
    </div>
  );
};

export default Room;
