import type { pictureProfileSettings } from "./PictureProfileSettings";

export interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
  userID: string;
  convName: string;
  pictureSetings: pictureProfileSettings;
  status: string;
  initConversation?: (id: any) => void;
}
