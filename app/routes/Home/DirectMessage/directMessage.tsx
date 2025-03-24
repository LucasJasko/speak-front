import UserItem from "~/components/UserItem/UserItem";
import type { Route } from "../+types/home";

import MessageArea from "~/components/MessageArea/MessageArea";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "ALERT MNS - Messages directs" }, { name: "description", content: "Ce sont vos messages directs" }];
}

const DirectMessage = () => {
  const [result, setResult] = useState([]);
  const [searchError, setSearchError] = useState(null);

  async function handleSearch(e: any) {
    const query = e.target.value;

    try {
      const res = await fetch("http://alert-mns-back/search.php", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setSearchError(e.message);
    }
  }

  return (
    <div className="direct-message">
      <div className="contact-area">
        <div className="contact-area__search">
          <input type="search" placeholder="Rechercher un utilisateur..." onInput={handleSearch} />
          <ul>
            {result && result.map((user) => <li>{user["user_name"]}</li>)}
            {searchError && <div>{searchError}</div>}
          </ul>
        </div>
        <div className="contact-area__list">
          <UserItem name="Utilisateur 1" pic="/assets/img/user1.png" status={true} />
          <UserItem name="Utilisateur 2" pic="/assets/img/user2.jpg" status={true} />
          <UserItem name="Utilisateur 3" pic="/assets/img/user3.jpg" status={true} />
        </div>
      </div>
      <MessageArea />
    </div>
  );
};

export default DirectMessage;
