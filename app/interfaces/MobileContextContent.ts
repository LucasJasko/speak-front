import type { Dispatch, SetStateAction } from "react";

export interface MobileContextContent {
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}
