//Internal Imports
import { Component } from "../types";

const StylePanel: React.FC<{
  selectedComponent: Component | null;
  setData: (data: Component[] | null) => void;
}> = ({ selectedComponent, setData }) => {
  if (!selectedComponent) {
    return null;
  }
  //type of focused component, used to switch style panel
  const { id, type } = selectedComponent;

  //update component, in production updating the DB after every key stroke would create a large amount of unnessacary API calls and put undue stress on the backend.
  //Updating the local state and then creating a confirm/cancel UI that managed BE updates is one example of more scalable architecture
  const updateComponent = (updates: any) => {
    let body = { id, ...updates };

    fetch("/api/component", { method: "PUT", body: JSON.stringify(body) })
      .then((response) => response.json())
      .then((data) => {
        //update local array with updated component list
        setData(data);
      });
  };

  //switch between UI to set imgSrc or text content, these panels could also includes various styles for components i.e. size, font, color, border etc.
  if (type === "image") {
    let { src, width, height } = selectedComponent;

    //width & height inputs need some validation to prevent wonky behavior
    return (
      <>
        <label htmlFor="imgsrc">Image Src</label>
        <input
          name="imgsrc"
          id="imgsrc-input"
          value={src}
          style={{ marginBottom: 18 }}
          onChange={(e) => updateComponent({ src: e.target.value })}
        />
        <label htmlFor="imgwidth">Image Width</label>
        <input
          type="number"
          name="imgwidth"
          id="imgwidth-input"
          value={width}
          style={{ marginBottom: 18 }}
          onChange={(e) => updateComponent({ width: e.target.value })}
        />
        <label htmlFor="imgheight">Image Height</label>
        <input
          type="number"
          name="imgheight"
          id="imgheight-input"
          value={height}
          onChange={(e) => updateComponent({ height: e.target.value })}
        />
      </>
    );
  } else if (type === "text") {
    let { fontSize, text } = selectedComponent;

    return (
      <>
        <label htmlFor="textcontent">Text Content</label>
        <textarea
          name="textcontent"
          id="textcontent-ta"
          value={text}
          style={{ marginBottom: 12 }}
          onChange={(e) => updateComponent({ text: e.target.value })}
        ></textarea>
        <label htmlFor="fontsize">Font Size</label>
        <input
          type="number"
          name="fontsize"
          id="fontsize-input"
          value={fontSize}
          onChange={(e) => updateComponent({ fontSize: e.target.value })}
        />
      </>
    );
  } else {
    return null;
  }
};

export default StylePanel;
