import UserItem from "~/components/UserItem/UserItem";
import type { Route } from "../+types/home";

import MessageArea from "~/components/MessageArea/MessageArea";
import { useEffect, useState, type ReactNode } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useNavigate } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { motion } from "motion/react";
import useAPI from "~/hook/useAPI";
import { useSettingsContext } from "~/context/SettingsContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = ({ typeID }: { typeID: string | undefined }) => {
  const { accessToken, id } = useAuthContext();
  const { profileDms } = useSettingsContext();
  const { isMobile } = useMobileContext();

  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);
  const [result, setResult] = useState<any>([]);
  const [activeConversation, setActiveConversation] = useState("0");
  const [activePath, setActivePath] = useState<string>("dm/0");

  const navigate = useNavigate();

  useEffect(() => {
    !isMobile ? setDisplayMobileSideMenu(true) : "";
    if (displayMobileSideMenu) {
      const contactAreaList = document.querySelector(".contact-area__list") as HTMLElement;
      contactAreaList.style.height = "calc(100% - 50px)";
    }
  }, [isMobile]);

  useEffect(() => {
    if (displayMobileSideMenu) {
      const contactAreaList = document.querySelector(".contact-area__list") as HTMLElement;
      contactAreaList.style.height = "calc(100% - 50px)";
    }
  }, [displayMobileSideMenu]);

  useEffect(() => {
    setActivePath(typeID + "/" + activeConversation);
  }, [activeConversation]);

  useEffect(() => {
    navigate(activePath);
  }, [activePath]);

  useEffect(() => {
    if (profileDms.length != 0) {
      console.log(profileDms);
    }
  }, [profileDms]);

  async function handleSearch(e: any) {
    const query = e.target.value;

    try {
      // TODO temporiser l'envoie de la requête avec stockage de la query avant envoie pour limiter les requêtes
      const { data } = await useAPI<Array<string>>("/search/profiles", { json: { query }, token: accessToken });
      if (query == "") {
        setResult([]);
      } else {
        data.length > 0 ? setResult(data) : setResult([]);
      }
    } catch (e: any) {
      setResult([]);
    }
  }

  const userResult = document.querySelector(".contact-area__results ul") as HTMLElement;
  const convList = document.querySelector(".contact-area__list") as HTMLElement;

  const handleHandshake = async (target: any) => {
    const isLinkable = await useAPI("/chat", { json: { target, origin: id }, token: accessToken });
    if (isLinkable) {
    }
  };

  useEffect(() => {
    if (!isMobile) {
      const resultsArea = document.querySelector(".contact-area__results") as HTMLElement;
      const listArea = document.querySelector(".contact-area__list") as HTMLElement;
      listArea.style.height = `calc(100% - ${resultsArea.clientHeight}px - 50px)`;
    }
  }, [result]);

  return (
    <div
      className="direct-message"
      style={isMobile ? { animation: `${displayMobileSideMenu ? "openMobileSideBar" : "closeMobileSideBar"} 0.2s ease forwards` } : {}}
    >
      {displayMobileSideMenu && (
        <div className="contact-area">
          <div className="contact-area__search">
            {!isMobile ? (
              <input className="contact-area__search-input" type="search" placeholder="Rechercher un utilisateur..." onInput={handleSearch} />
            ) : (
              <motion.button
                whileHover={{
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.95 }}
                className="contact-area__search-input contact-area__search-input__button"
                onClick={() => {}}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </motion.button>
            )}
          </div>
          {!isMobile && (
            <div className="contact-area__results">
              <ul>
                {result.map((user: any) => (
                  // TODO à terme cacher les champs de la bdd en modifiant la réponse du endpoint search
                  <UserItem
                    key={user.profile_id}
                    userID={user.profile_id}
                    convID={user.profile_id}
                    convName={user.profile_name + " " + user.profile_surname}
                    activeConversation={activeConversation}
                    setActiveConversation={setActiveConversation}
                    initConversation={handleHandshake}
                    pictureSetings={{
                      id: user.profile_id,
                      surname: user.profile_surname,
                      name: user.profile_name,
                      picture: user.profile_picture,
                    }}
                    status={user.status_id}
                  />
                ))}
              </ul>
            </div>
          )}
          <div className="contact-area__list">
            {profileDms &&
              profileDms.map((profileDm) => (
                <UserItem
                  key={profileDm.id}
                  userID={profileDm.id.toString()}
                  convID={profileDm.id.toString()}
                  convName={profileDm.name + " " + profileDm.surname}
                  activeConversation={activeConversation}
                  setActiveConversation={setActiveConversation}
                  initConversation={handleHandshake}
                  pictureSetings={{
                    id: profileDm.id,
                    surname: profileDm.surname,
                    name: profileDm.name,
                    picture: profileDm.picture,
                  }}
                  status={profileDm.status.toString()}
                />
              ))}
          </div>
        </div>
      )}
      <MessageArea
        typeID={typeID}
        convID={activeConversation}
        activeConversation={activeConversation}
        MobileSideMenuState={displayMobileSideMenu}
        setMobileSideMenu={setDisplayMobileSideMenu}
      />
    </div>
  );
};

export default DirectMessage;
