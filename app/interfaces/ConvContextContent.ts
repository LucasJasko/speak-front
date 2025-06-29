import type { Dispatch, SetStateAction } from "react";
import type { ProfileDm } from "./ProfileDm";

export interface ConvContextContent {
  convParams: ProfileDm | null;
  convPicture: string | null;
  setConvPicture: Dispatch<SetStateAction<string | null>>;
  setConvParams: Dispatch<SetStateAction<ProfileDm | null>>;
}
