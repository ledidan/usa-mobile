// BUTI Corp All right Reserved ©
// Son That Ton
// john@buti.io

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

// Style
import Style from "./style";

const PageMsg = ({ children }) => {
  return <View style={Style.msgContainer}>{children}</View>;
};

PageMsg.propTypes = {
  children: PropTypes.any.isRequired,
};

export default PageMsg;
