import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

const MobileContext = createContext({ isMobile: false });

interface MobileContextContent {
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}

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
