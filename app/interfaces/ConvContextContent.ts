import type { Dispatch, SetStateAction } from "react";
import type { ProfileDm } from "./ProfileDm";
import type { ProfileGroup } from "./ProfileGroup";
import type { RoomProps } from "./RoomProps";
import type { profileSettings } from "./ProfileSettings";

export interface ConvContextContent {
  convParams: ProfileDm | RoomProps | null;
  convPicture: string | null;
  groupParams: ProfileGroup | undefined;
  groupProfiles: profileSettings[];
  rooms: RoomProps[];
  setGroupProfiles: Dispatch<SetStateAction<profileSettings[]>>;
  setGroupParams: Dispatch<SetStateAction<ProfileGroup | undefined>>;
  setRooms: Dispatch<SetStateAction<RoomProps[]>>;
  setConvPicture: Dispatch<SetStateAction<string | null>>;
  setConvParams: Dispatch<SetStateAction<ProfileDm | RoomProps | null>>;
}
