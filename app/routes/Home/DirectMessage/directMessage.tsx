import UserItem from "~/components/UserItem/UserItem";
import type { Route } from "../+types/home";

import MessageArea from "~/components/MessageArea/MessageArea";
import { useEffect, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { useNavigate } from "react-router";
import useAPI from "~/hook/useAPI";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = ({ typeID }: { typeID: string | undefined }) => {
  const { isMobile } = useMobileContext();
  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);

  const [result, setResult] = useState<any>([]);
  const [searchError, setSearchError] = useState("");

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
      const res = await useAPI("/search", {
        json: {
          search: query,
        },
      });
      const data: any = res;
      // Array.isArray(data) ? (setResult(data), setSearchError("")) : (setSearchError(data), setResult([]));
    } catch (e: any) {
      setSearchError(e.message);
      setResult([]);
    }
  }

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
              <ul>{searchError ? <li>{searchError}</li> : result.map((user: any) => <li key={user["user_name"]}>{user["user_name"]}</li>)}</ul>
            </div>
          )}
          <div className="contact-area__list">
            <UserItem
              convID="abc123"
              convName="Utilisateur 1"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              pic="/assets/img/user1.png"
              status={true}
            />
            <UserItem
              convID="def456"
              convName="Utilisateur 2"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              pic="/assets/img/user2.jpg"
              status={true}
            />
            <UserItem
              convID="ghi789"
              convName="Utilisateur 3"
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              pic="/assets/img/user3.jpg"
              status={true}
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
