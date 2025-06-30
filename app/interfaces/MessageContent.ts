export interface messageContent {
  messageHeaders: {
    isForGroup?: boolean;
    date?: string;
    type?: string;
    sender?: number;
    target?: number;
  };
  messageBody: {
    text?: string;
    code?: string;
    event?: string;
    file?: {
      name: string;
      link: string;
      picture: string;
    };
  };
}
