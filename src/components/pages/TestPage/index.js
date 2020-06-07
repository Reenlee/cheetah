import React from "react";

function ListItem(prop) {
  return (
    <div>
      <div>{prop.data.name}</div>
      <div>{prop.data.message}</div>
    </div>
  );
}

function Test() {
  const name = "Jake";
  const buttonStyle = {
    backgroundColor: "red",
    padding: "20px",
  };

  const list = [
    { name: "Jake", message: "Hello, there" },
    { name: "Mike", message: "Wassup" },
    { name: "Pike", message: "Did you go to school?" },
    { name: "Ryan", message: "No, man" },
  ];

  const ListComponents = list.map(function (item) {
    return <ListItem data={item} />;
  });

  const handleClick = (x) => {
    alert(x);
  };

  return (
    <div style={buttonStyle} onClick={() => handleClick("Hello, there!")}>
      Hello World, {name}!<div>{ListComponents}</div>
    </div>
  );
}

export default Test;
