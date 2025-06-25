import type { Dispatch, SetStateAction } from "react";
import type { ProfileDm } from "./ProfileDm";
import type { ProfileGroup } from "./ProfileGroup";
import type { pictureProfileSettings } from "./PictureProfileSettings";
import type { pictureGroupSettings } from "./PictureGroupSettings";

export interface SettingsContextType {
  name: string;
  surname: string;
  mail: string;
  password: string;
  theme: string;
  picture: string | undefined | Promise<string | undefined>;
  b64Picture: string;
  status: string;
  role: string;
  language: string;
  profileGroups: ProfileGroup[];
  error: string | null;
  profileDms: ProfileDm[];
  activeLayout: string;
  lastActive: string;
  handleActiveLayout: (currentActive: string) => void;
  setProfileDms: Dispatch<SetStateAction<ProfileDm[]>>;
  setName: Dispatch<SetStateAction<string>>;
  setSurname: Dispatch<SetStateAction<string>>;
  setMail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setTheme: Dispatch<SetStateAction<string>>;
  setPicture: Dispatch<SetStateAction<string | undefined | Promise<string | undefined>>>;
  setStatus: Dispatch<SetStateAction<string>>;
  setRole: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<string>>;
  setProfileGroups: Dispatch<SetStateAction<ProfileGroup[]>>;
  fetchSettings: () => Promise<void>;
  fetchProfilePicture: ({ id, name, surname, picture }: pictureProfileSettings) => Promise<string | undefined>;
  fetchGroupPicture: ({ id, name, picture }: pictureGroupSettings) => Promise<string | undefined>;
}
