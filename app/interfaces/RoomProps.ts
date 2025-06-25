export interface RoomProps {
  id: string;
  name: string;
  icon: React.ReactElement;
  groupID: string;
  onClick: (e: boolean) => void;
}
