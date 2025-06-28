import type { Dispatch, SetStateAction } from "react";
import type { ProfileDm } from "./ProfileDm";

export interface ConvContextContent {
  convParams: ProfileDm;
  convPicture: string;
  setConvPicture: Dispatch<SetStateAction<string>>;
  setConvParams: Dispatch<SetStateAction<ProfileDm>>;
}
