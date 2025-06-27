import type { ProfileListProps } from "~/interfaces/ProfileListProps";

const ProfileList: React.FC<ProfileListProps> = ({ menuMap, activeMenu, onSelect }) => {
  return (
    <div className="profile__list-container">
      <ul className="profile__list">
        {menuMap.map(({ key, name }) => (
          <li
            tabIndex={-1}
            key={key}
            className={`profile__item ${activeMenu == `${key}` ? "profile__item-active" : ""} ${key == "disconnect" ? "profile__item-disconnect" : ""} `}
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

export default ProfileList;
