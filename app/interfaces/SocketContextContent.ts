import type { Dispatch, RefObject, SetStateAction } from "react";
import type { messageContent } from "./MessageContent";

export interface SocketContextContent {
  socketRef: RefObject<WebSocket | null> | null;
  openMessage: null | messageContent;
  closeMessage: null | messageContent;
  errorMessage: null | messageContent;
  newMessage: null | messageContent;
  setNewMessage: Dispatch<SetStateAction<null | messageContent>>;
}
