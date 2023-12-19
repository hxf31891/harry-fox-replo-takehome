//Internal Imports
import { Component, TextComponent } from "../types";
import Tag from "./Tag";

const Text: React.FC<{
  component: TextComponent;
  isSelected: boolean;
  setSelected: (id: number) => void;
  setData: (data: Component[] | null) => void;
}> = ({ component, isSelected, setData, setSelected }) => {
  return (
    <div
      className="card"
      onClick={() => setSelected(component?.id)}
      style={{ outline: isSelected ? "1px solid blue" : "" }}
    >
      <p style={{ color: "white", fontSize: `${component.fontSize}px` }}>
        {component.text}
      </p>
      <Tag type="TEXT" id={component?.id} setData={setData} />
    </div>
  );
};

export default Text;
