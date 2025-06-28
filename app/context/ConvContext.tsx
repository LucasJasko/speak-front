import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router";
import type { ConvContextContent } from "~/interfaces/ConvContextContent";
import { useSettingsContext } from "./SettingsContext";
import type { ProfileDm } from "~/interfaces/ProfileDm";

const ConvContext = createContext<ConvContextContent>({
  convPicture: "",
  convParams: {
    creation: "",
    id: 0,
    name: "",
    surname: "",
    picture: "",
    role: 0,
    status: 0,
  },
  setConvPicture: () => {},
  setConvParams: () => {},
});

export const ConvProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { convID } = useParams();
  const { profileDms, fetchProfilePicture } = useSettingsContext();

  const [convParams, setConvParams] = useState<ProfileDm>({
    creation: "",
    id: 0,
    name: "",
    surname: "",
    picture: "",
    role: 0,
    status: 0,
  });
  const [convPicture, setConvPicture] = useState<string>("");

  useEffect(() => {
    if (convID != "0") {
      for (let i = 0; i < profileDms.length; i++) {
        if (profileDms[i].id.toString() == convID) {
          setConvParams(profileDms[i]);
        }
      }

      if (convParams != undefined) {
        const convPictureParams = {
          id: convParams.id,
          name: convParams.name,
          surname: convParams.surname,
          picture: convParams.picture,
        };

        fetchProfilePicture(convPictureParams).then((picture) => {
          setConvPicture(picture);
        });
      }
    }
  }, [convID]);

  return <ConvContext value={{ convParams, convPicture, setConvParams, setConvPicture }}>{children}</ConvContext>;
};

export const useConvContext = () => useContext(ConvContext);
