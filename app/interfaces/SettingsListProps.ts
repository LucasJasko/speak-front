export interface SettingsListProps {
  menuMap: { key: string; name: string }[];
  activeMenu: string;
  onSelect: (key: string) => void;
}
