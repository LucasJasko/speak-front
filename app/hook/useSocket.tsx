export default async function useSocket() {
  let socket = new WebSocket("ws://localhost:8060");

  function parseMessage(message: string) {
    let msg = { type: "", sender: "", text: "" };
    try {
      msg = JSON.parse(message);
    } catch (e) {
      return false;
    }

    return msg;
  }

  function appendMessage(message: string) {
    let msgContainer = document.querySelector(".message-area__feed");
    let parsedMessage;

    if ((parsedMessage = parseMessage(message))) {
      // Ajouter le message à la discussion
      console.log("appending message...");
      console.log(parsedMessage);

      let msgElement, senderElement, textElement;
      let sender, text;
    }
  }

  let socketOpen = (e: Event) => {
    console.log("Connecté au serveur de discussion");
    let msg = {
      type: "join",
      sender: "Browser",
      text: "Connected to the chat server",
    };
    appendMessage(JSON.stringify(msg));
  };
  let socketMessage = (e: Event) => {};
  let socketClose = (e: Event) => {};
  let socketError = (e: Event) => {};

  socket.addEventListener("open", socketOpen);
  socket.addEventListener("message", socketMessage);
  socket.addEventListener("close", socketClose);
  socket.addEventListener("error", socketError);
}
