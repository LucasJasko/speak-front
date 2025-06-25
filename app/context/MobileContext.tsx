import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MobileContextContent } from "~/interfaces/MobileCOntextCOntent";

const MobileContext = createContext({ isMobile: false });

export const MobileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const context: MobileContextContent = { isMobile, setIsMobile };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <MobileContext value={context}>{children}</MobileContext>;
};

export const useMobileContext = () => useContext(MobileContext);
