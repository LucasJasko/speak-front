import { useParams } from "react-router";
import DirectMessage from "./DirectMessage/DirectMessage";
import Group from "./Group/Group";

const TypeRouter = () => {
  const { typeID } = useParams();

  if (typeID?.includes("dm")) return <DirectMessage />;
  else return <Group />;
};

export default TypeRouter;
