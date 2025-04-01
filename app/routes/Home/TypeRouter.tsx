import { useParams } from "react-router";
import DirectMessage from "./DirectMessage/directMessage";
import Group from "./Group/group";

const TypeRouter = () => {
  const { typeID } = useParams();

  if (typeID?.includes("dm")) return <DirectMessage typeID={typeID} />;
  else return <Group typeID={typeID} />;
};

export default TypeRouter;
