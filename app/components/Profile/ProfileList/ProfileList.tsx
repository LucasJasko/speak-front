import { AnimatePresence, motion } from "motion/react";
interface ProfileListProps {
  menuMap: { key: string; name: string }[];
  activeMenu: string;
  onSelect: (key: string) => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ menuMap, activeMenu, onSelect }) => {
  return (
    <div className="profile__list-container">
      <ul className="profile__list">
        {menuMap.map(({ key, name }) => (
          <li
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
