import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router";
import type { ConvContextContent } from "~/interfaces/ConvContextContent";
import { useSettingsContext } from "./SettingsContext";
import type { ProfileDm } from "~/interfaces/ProfileDm";
import { useAuthContext } from "./AuthContext";
import type { ProfileGroup } from "~/interfaces/ProfileGroup";
import type { RoomProps } from "~/interfaces/RoomProps";
import useAPI from "~/hook/useAPI";

const ConvContext = createContext<ConvContextContent | undefined>(undefined);

export const useConvContext = (): ConvContextContent => {
  const context = useContext(ConvContext);
  if (!context) {
    throw new Error("useContextContext doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
};

export const ConvProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessToken, id } = useAuthContext();
  const { typeID, convID } = useParams();
  const { profileDms, fetchProfilePicture, profileGroups } = useSettingsContext();

  const [convParams, setConvParams] = useState<ProfileDm | RoomProps | null>(null);
  const [convPicture, setConvPicture] = useState<string | null>(null);

  const [groupParams, setGroupParams] = useState<ProfileGroup | undefined>(undefined);
  const [rooms, setRooms] = useState<RoomProps[]>([]);

  async function getDmParams() {
    for (let i = 0; i < profileDms.length; i++) {
      if (profileDms[i].id.toString() == convID) {
        setConvParams(profileDms[i]);

        const convPictureParams = {
          id: profileDms[i].id,
          name: profileDms[i].name,
          surname: profileDms[i].surname,
          picture: profileDms[i].picture,
        };

        const picture = await fetchProfilePicture(convPictureParams);
        setConvPicture(picture);
      }
    }
  }

  async function getGroupParams() {
    for (let i = 0; i < profileGroups.length; i++) {
      if (profileGroups[i].id.toString() == typeID) {
        setGroupParams(profileGroups[i]);
        setConvPicture(profileGroups[i].picture);
      }
    }
  }

  async function fetchRooms() {
    if (groupParams != undefined) {
      const res = await useAPI<RoomProps[]>("/rooms", { json: { group: groupParams.id }, token: accessToken });
      setRooms(res.data);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, [groupParams]);

  useEffect(() => {
    if (convID != "0" && id != undefined) {
      if (typeID === "dm") {
        getDmParams();
      } else {
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i].id == convID) {
            setConvParams(rooms[i]);
          }
        }
      }
    }
  }, [convID, id]);

  useEffect(() => {
    getGroupParams();
  }, [typeID]);

  useEffect(() => {
    // console.log("conv picture: " + convPicture);
    console.log(convParams);
    // console.log("conv id: " + convID);
    // console.log("id: " + id);
  }, [convPicture, convParams]);

  return <ConvContext value={{ convParams, groupParams, setGroupParams, rooms, setRooms, convPicture, setConvParams, setConvPicture }}>{children}</ConvContext>;
};
