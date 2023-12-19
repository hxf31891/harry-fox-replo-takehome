//Internal Imports
import { Component, ImgComponent } from "../types";
import Tag from "./Tag";

const Image: React.FC<{
  component: ImgComponent;
  isSelected: boolean;
  setSelected: (id: number) => void;
  setData: (data: Component[] | null) => void;
}> = ({ component, isSelected, setData, setSelected }) => {
  const { id, src, width, height } = component;

  return (
    <div
      className="card"
      onClick={() => setSelected(id)}
      style={{ outline: isSelected ? "1px solid blue" : "" }}
    >
      <img
        src={src}
        alt="Image"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />
      <Tag type="IMAGE" id={id} setData={setData} />
    </div>
  );
};

export default Image;
