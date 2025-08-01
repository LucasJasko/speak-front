import UserItem from "~/components/UserItem/UserItem";
import type { Route } from "../+types/Home";

import MessageArea from "~/components/MessageArea/MessageArea";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useParams } from "react-router";
import { useAuthContext } from "~/context/AuthContext";
import { motion } from "motion/react";
import useAPI from "~/hook/useAPI";
import { useSettingsContext } from "~/context/SettingsContext";
import { useSocketContext } from "~/context/SocketContext";
import type { messageContent } from "~/interfaces/MessageContent";
import type { ProfileDm } from "~/interfaces/ProfileDm";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = () => {
  const { typeID, convID } = useParams();
  const { accessToken, id } = useAuthContext();
  const { profileDms, setProfileDms } = useSettingsContext();
  const { isMobile } = useMobileContext();
  const { socketRef } = useSocketContext();

  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);
  const [result, setResult] = useState<any>([]);

  const timeoutRef = useRef<any>(null);

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

  async function handleSearch(e: any) {
    const query = e.target.value;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
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
    }, 500);
  }

  const initConversation = async (target: any) => {
    const res = await useAPI<ProfileDm>("/chat/select", { json: { target, origin: id }, token: accessToken });
    if (res.status != 204) setProfileDms((prev) => [...prev, res.data]);
    const inputSearch = document.querySelector(".contact-area__search-input") as HTMLInputElement;
    inputSearch.value = "";
    setResult([]);
  };

  useEffect(() => {
    if (!socketRef?.current || socketRef.current.readyState !== WebSocket.OPEN) return;

    const message: messageContent = {
      messageHeaders: {
        isForGroup: typeID == "dm" ? false : true,
        date: Date.now().toString(),
        type: "switch",
        sender: id,
        target: convID ? parseInt(convID, 10) : undefined,
      },
      messageBody: {},
    };

    if (convID != "0") {
      socketRef.current.send(JSON.stringify(message));
    }

    if (isMobile) {
      setDisplayMobileSideMenu(false);
    }
  }, [convID]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
                    convName={user.profile_name + " " + user.profile_surname}
                    initConversation={initConversation}
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
                  convName={profileDm.name + " " + profileDm.surname}
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
      <MessageArea MobileSideMenuState={displayMobileSideMenu} setMobileSideMenu={setDisplayMobileSideMenu} />
    </div>
  );
};

export default DirectMessage;
