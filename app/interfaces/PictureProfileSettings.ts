export interface pictureProfileSettings {
  id: any;
  surname: string;
  name: string;
  picture: string | undefined | Promise<string | undefined>;
}
