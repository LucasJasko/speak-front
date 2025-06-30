import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router";
import type { ConvContextContent } from "~/interfaces/ConvContextContent";
import { useSettingsContext } from "./SettingsContext";
import type { ProfileDm } from "~/interfaces/ProfileDm";
import { useAuthContext } from "./AuthContext";

const ConvContext = createContext<ConvContextContent | undefined>(undefined);

export const useConvContext = (): ConvContextContent => {
  const context = useContext(ConvContext);
  if (!context) {
    throw new Error("useContextContext doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
};

export const ConvProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { id } = useAuthContext();
  const { convID } = useParams();
  const { profileDms, fetchProfilePicture } = useSettingsContext();

  const [convParams, setConvParams] = useState<ProfileDm | null>(null);
  const [convPicture, setConvPicture] = useState<string | null>(null);

  useEffect(() => {
    if (convID != "0" && id != undefined) {
      async function fetchConvParams() {
        for (let i = 0; i < profileDms.length; i++) {
          if (profileDms[i].id.toString() == convID) {
            setConvParams(profileDms[i]);

            const convPictureParams = {
              id: profileDms[i].id,
              name: profileDms[i].name,
              surname: profileDms[i].surname,
              picture: profileDms[i].picture,
            };

            const picture = await fetchProfilePicture(convPictureParams);
            setConvPicture(picture);
          }
        }
      }
      fetchConvParams();
    }
  }, [convID, id, profileDms]);

  useEffect(() => {
    // console.log("conv picture: " + convPicture);
    // console.log(convParams);
    // console.log("conv id: " + convID);
    // console.log("id: " + id);
  }, [convPicture, convParams]);

  return <ConvContext value={{ convParams, convPicture, setConvParams, setConvPicture }}>{children}</ConvContext>;
};
