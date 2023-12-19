import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import ComponentsPanel from "../src/components/ComponentsPanel";
import StylesPanel from "../src/components/StylesPanel";
import ImageComponent from "../src/components/Image";
import Text from "../src/components/Text";
import { Component } from "../src/types";

const Home: NextPage = () => {
  const [data, setData] = useState<Component[] | null>(null);
  //store focused component id
  const [selected, setSelected] = useState<Number>(1);
  //find focused component object in array
  const selectedComponent = data?.find((c) => c?.id === selected) || null;

  //fetch initial components on load
  useEffect(() => {
    fetch("/api/component")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <ComponentsPanel
        data={data}
        setData={setData}
        setSelected={setSelected}
      />
      <div className="page">
        {data.map((component) => {
          if (component.type === "text") {
            return (
              <Text
                key={component.id}
                component={component}
                isSelected={selected === component?.id}
                setData={setData}
                setSelected={setSelected}
              />
            );
          }
          if (component.type === "image") {
            return (
              <ImageComponent
                key={component.id}
                component={component}
                isSelected={selected === component?.id}
                setData={setData}
                setSelected={setSelected}
              />
            );
          }

          return null;
        })}
      </div>
      {/* Left the panels styles here to provent bounce when no component is selected */}
      <div
        style={{
          width: 300,
          height: "100vh",
          background: "rgb(24,24,24)",
          padding: 12,
        }}
      >
        <StylesPanel setData={setData} selectedComponent={selectedComponent} />
      </div>
    </div>
  );
};

export default Home;
