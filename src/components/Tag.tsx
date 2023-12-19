import { BsX } from "react-icons/bs";
import { Component } from "../types";

const Tag: React.FC<{
  id: number;
  type: string;
  setData: (data: Component[] | null) => void;
}> = ({ id, type, setData }) => {
  //delete component
  const removeItem = () => {
    // simulates loading
    setData(null);
    fetch(`/api/component`, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <div className="tag">
      {type}
      <BsX onClick={removeItem} style={{ fontSize: 16, marginLeft: 5 }} />
    </div>
  );
};

export default Tag;
