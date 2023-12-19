export type Component = { id: number } & (
  | {
      type: "text";
      text: string;
      fontSize: string;
    }
  | { type: "image"; src: string; width: string; height: string }
);

export type ImgComponent = {
  id: number;
  type: "image";
  src: string;
  width: string;
  height: string;
};

export type TextComponent = {
  id: number;
  type: "text";
  text: string;
  fontSize: string;
};
