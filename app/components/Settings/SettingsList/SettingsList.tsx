interface SettingsListProps {
  menuMap: { key: string; name: string }[];
  activeMenu: string;
  onSelect: (key: string) => void;
}

const SettingsList: React.FC<SettingsListProps> = ({ menuMap, activeMenu, onSelect }) => {
  return (
    <div className="settings__list-container">
      <ul className="settings__list">
        {menuMap.map(({ key, name }) => (
          <li
            key={key}
            className={`settings__item ${activeMenu == `${key}` ? "settings__item-active" : ""}`}
            onClick={() => {
              onSelect(key);
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingsList;
