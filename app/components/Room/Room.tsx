import type React from "react";
import { useNavigate, useParams } from "react-router";
import { useMobileContext } from "~/context/MobileContext";
import type { RoomProps } from "~/interfaces/RoomProps";

const Room: React.FC<RoomProps> = ({ id, name, icon, onClick }) => {
  const navigate = useNavigate();

  const { isMobile } = useMobileContext();
  const { typeID, convID } = useParams();

  return (
    <div
      className={`room${convID === id.toString() ? " active-room" : ""}`}
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
