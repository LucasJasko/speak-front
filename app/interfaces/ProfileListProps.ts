export interface ProfileListProps {
  menuMap: { key: string; name: string }[];
  activeMenu: string;
  onSelect: (key: string) => void;
}
