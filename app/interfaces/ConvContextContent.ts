import type { Dispatch, SetStateAction } from "react";
import type { ProfileDm } from "./ProfileDm";
import type { ProfileGroup } from "./ProfileGroup";
import type { RoomProps } from "./RoomProps";

export interface ConvContextContent {
  convParams: ProfileDm | RoomProps | null;
  convPicture: string | null;
  groupParams: ProfileGroup | undefined;
  setGroupParams: Dispatch<SetStateAction<ProfileGroup | undefined>>;
  rooms: RoomProps[];
  setRooms: Dispatch<SetStateAction<RoomProps[]>>;
  setConvPicture: Dispatch<SetStateAction<string | null>>;
  setConvParams: Dispatch<SetStateAction<ProfileDm | RoomProps | null>>;
}
