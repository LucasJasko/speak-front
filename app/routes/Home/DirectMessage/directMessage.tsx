import UserItem from "~/components/UserItem/UserItem";
import type { Route } from "../+types/home";

import MessageArea from "~/components/MessageArea/MessageArea";
import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useNavigate } from "react-router";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "~/context/AuthContext";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = ({ typeID }: { typeID: string | undefined }) => {
  const { accessToken } = useAuthContext();
  const { isMobile } = useMobileContext();
  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);

  const [result, setResult] = useState<any>([]);

  const [activeConversation, setActiveConversation] = useState("abc123");
  const [activePath, setActivePath] = useState<string>("dm-123/abc123");
  const navigate = useNavigate();

  useEffect(() => {
    !isMobile ? setDisplayMobileSideMenu(true) : "";
  }, [isMobile]);

  useEffect(() => {
    setActivePath(typeID + "/" + activeConversation);
  }, [activeConversation]);

  useEffect(() => {
    navigate(activePath);
  }, [activePath]);

  async function handleSearch(e: any) {
    const query = e.target.value;

    try {
      // TODO temporiser l'envoie de la requête avec stockage de la query avant envoie pour limiter les requêtes
      const response: Array<string> = await useAPI("/search", {
        json: {
          accessToken,
          query,
        },
      });
      if (query == "") {
        setResult([]);
      } else {
        response.length > 0 ? setResult(response) : setResult([]);
      }
    } catch (e: any) {
      setResult([]);
    }
  }

  useEffect(() => {
    const resultsArea = document.querySelector(".contact-area__results") as HTMLElement;
    const listArea = document.querySelector(".contact-area__list") as HTMLElement;
    listArea.style.height = `calc(100% - ${resultsArea.clientHeight}px - 50px)`;
  }, [result]);

  return (
    <div
      className="direct-message"
      style={isMobile ? { animation: `${displayMobileSideMenu ? "openMobileSideBar" : "closeMobileSideBar"} 0.2s ease forwards` } : {}}
    >
      {displayMobileSideMenu && (
        <div className="contact-area">
          {!isMobile && (
            <div className="contact-area__search">
              <input type="search" placeholder="Rechercher un utilisateur..." onInput={handleSearch} />
            </div>
          )}
          {!isMobile && (
            <div className="contact-area__results">
              <ul>
                {result.map((user: any) => (
                  <UserItem
                    key={user.profile_id}
                    convID="abc1234"
                    convName={user.profile_name + " " + user.profile_surname}
                    activeConversation={activeConversation}
                    setActiveConversation={setActiveConversation}
                    pictureSetings={{
                      id: user.profile_id,
                      surname: user.profile_surname,
                      name: user.profile_name,
                      profilePicture: user.profile_picture,
                    }}
                    status={user.status_id}
                  />
                ))}
              </ul>
            </div>
          )}
          <div className="contact-area__list">
            <UserItem
              convID="abc123"
              convName="Utilisateur 1"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              pictureSetings={{
                id: 1,
                surname: "Jaskowiak",
                name: "Lucas",
                profilePicture: "yes",
              }}
              status={"2"}
            />
            <UserItem
              convID="def456"
              convName="Utilisateur 2"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              pictureSetings={{
                id: 1,
                surname: "Jaskowiak",
                name: "Lucas",
                profilePicture: "yes",
              }}
              status={"2"}
            />
            <UserItem
              convID="ghi789"
              convName="Utilisateur 3"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              pictureSetings={{
                id: 1,
                surname: "Jaskowiak",
                name: "Lucas",
                profilePicture: "yes",
              }}
              status={"1"}
            />
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
