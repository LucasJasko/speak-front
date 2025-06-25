export interface messageContent {
  messageInfos: {
    isFromSocket: boolean;
    isForGroup?: false | string;
    date?: string;
    type?: string;
    sender?: string;
    target?: string;
  };
  authorName: string;
  authorSurname: string;
  authorLink?: string;
  authorImg?: string;
  authorMessage: {
    messageText?: string;
    messageCode?: string;
    messageEvent?: string;
    messageFile?: {
      fileLink: string;
      filePicture: string;
      fileName: string;
    };
  };
}
