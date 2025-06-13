import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type RefObject, type SetStateAction } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";
import { useParams } from "react-router";

const noop = () => {};
const SocketContext = createContext<SocketContextContent>({
  openMessage: "",
  closeMessage: "",
  errorMessage: "",
  newMessage: "",
  setNewMessage: noop,
  socketRef: null,
});

interface SocketContextContent {
  socketRef: RefObject<WebSocket | null> | null;
  openMessage: string;
  closeMessage: string;
  errorMessage: string;
  newMessage: string;
  setNewMessage: Dispatch<SetStateAction<string>>;
}

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { typeID, convID } = useParams();
  const { accessToken } = useAuthContext();

  const socketRef = useRef<WebSocket | null>(null);

  const [openMessage, setOpenMessage] = useState<string>("");
  const [closeMessage, setCloseMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const context: SocketContextContent = { openMessage, closeMessage, errorMessage, newMessage, setNewMessage, socketRef };

  useEffect(() => {
    if (!accessToken) return;

    async function handleConnexion() {
      const res = await useAPI("/socket", { token: accessToken });
      console.log(res);

      if (res) {
        let socket = new WebSocket("ws://localhost:8060");
        socketRef.current = socket;

        socket.onopen = (e: Event) => {
          setOpenMessage("Connexion établie");
        };
        socket.onmessage = (e: MessageEvent) => {
          setNewMessage(e.data);
        };

        socket.onclose = (e: CloseEvent) => {
          console.log("Connexion socket fermée", e);
          setCloseMessage("Fermeture de la connexion, le serveur est indisponible.");
        };

        socket.onerror = (e: Event) => {
          console.error("Erreur WebSocket", e);
          setErrorMessage("Erreur de communication avec le serveur.");
        };
      }
      const handleBeforeUnload = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.close(1001, "Page rechargée ou fermée");
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close(1000, "Client déconnecté");
      }
    }
    handleConnexion();
  }, [accessToken]);

  return <SocketContext value={context}>{children}</SocketContext>;
};

export const useSocketContext = () => useContext(SocketContext);
