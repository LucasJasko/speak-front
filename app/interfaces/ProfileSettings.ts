export interface profileSettings {
  name: string;
  surname: string;
  theme: string;
  mail: string;
  picture: string | undefined | Promise<string | undefined>;
  status: string;
  language: string;
  situations: { élève: string }[];
}
