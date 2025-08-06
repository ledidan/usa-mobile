import React from "react";
// import { useKeepAwake } from "expo-keep-awake";

const KeepAwake = props => {
  // useKeepAwake();
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default KeepAwake;
