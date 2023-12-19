//External Imports
import { BsFonts, BsImage } from "react-icons/bs";
//Internal Imports
import { Component } from "../types";

const ComponentsPanel: React.FC<{
  data: Component[];
  setSelected: (id: number) => void;
  setData: (data: Component[] | null) => void;
}> = ({ data, setData, setSelected }) => {
  //adds new component to the list
  const addComponent = (type: string) => {
    //simulates loading
    setData(null);
    //create simple id, BUG: when components are deleted we can end up with components with same id
    let newId = data?.length + 1;
    //get default component data using type prop
    let newComponentData = newComponentDatas[type];
    //create new list of components to overwrite db.json. obviously not production quality but works for our use case
    let body = [...data, { id: newId, ...newComponentData }];
    let bodyStr = JSON.stringify(body);
    fetch("/api/component", { method: "POST", body: bodyStr }).then(() => {
      //update local array with new component list
      setData(body as Component[]);
      //set the new component as selected
      setSelected(newId);
    });
  };

  return (
    <div
      style={{
        width: 300,
        height: "100vh",
        background: "rgb(24,24,24)",
        padding: 12,
      }}
    >
      <div style={{ fontSize: 32, color: "white", marginBottom: "18px" }}>
        interview<span style={{ fontStyle: "italic" }}>lo</span>
      </div>
      <div style={{ display: "flex" }}>
        <div className="new-component-btn" onClick={() => addComponent("text")}>
          <BsFonts className="new-component-btn_icon" />
          Text
        </div>
        <div
          className="new-component-btn"
          onClick={() => addComponent("image")}
        >
          <BsImage
            className="new-component-btn_icon"
            style={{ fontSize: 27 }}
          />
          Image
        </div>
      </div>
    </div>
  );
};

export default ComponentsPanel;

interface newCompData {
  [key: string]: newCompTypes;
}

type newCompTypes = {
  type: string;
  text?: string;
  src?: string;
  width?: string;
  height?: string;
  fontSize?: string;
};

const newComponentDatas: newCompData = {
  text: { type: "text", text: "Hello World!", fontSize: "18" },
  image: {
    type: "image",
    src: "http://placekitten.com/200/300",
    width: "200",
    height: "300",
  },
};
