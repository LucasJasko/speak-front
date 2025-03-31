import UserItem from "~/components/UserItem/UserItem";
import type { Route } from "../+types/home";

import MessageArea from "~/components/MessageArea/MessageArea";
import { useEffect, useRef, useState } from "react";
import { useMobileContext } from "~/context/MobileContext";
import { AnimatePresence, motion } from "motion/react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = () => {
  const [result, setResult] = useState<any>([]);
  const [searchError, setSearchError] = useState("");
  const { isMobile } = useMobileContext();
  const [displayMobileSideMenu, setDisplayMobileSideMenu] = useState(true);

  useEffect(() => {
    !isMobile ? setDisplayMobileSideMenu(true) : "";
  }, [isMobile]);

  async function handleSearch(e: any) {
    const query = e.target.value;

    try {
      const res = await fetch("http://alert-mns-back/search.php", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: query }),
      });
      const data = await res.json();
      Array.isArray(data) ? (setResult(data), setSearchError("")) : (setSearchError(data), setResult([]));
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
            <UserItem name="Utilisateur 1" pic="/assets/img/user1.png" status={true} />
            <UserItem name="Utilisateur 2" pic="/assets/img/user2.jpg" status={true} />
            <UserItem name="Utilisateur 3" pic="/assets/img/user3.jpg" status={true} />
          </div>
        </div>
      )}
      <MessageArea convID="direct-message" MobileSideMenuState={displayMobileSideMenu} setMobileSideMenu={setDisplayMobileSideMenu} />
    </div>
  );
};

export default DirectMessage;
