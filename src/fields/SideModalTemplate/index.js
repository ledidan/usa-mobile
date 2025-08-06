import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Portal, Modal as PaperModal } from "react-native-paper";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import Style from "./style";
import { responsiveWidth } from "react-native-responsive-dimensions";

const SideModalTemplate = ({
  onCloseModal,
  children,
  side,
  containerStyle = {},
  header_title = "",
}) => {
  return (
    <Portal>
      <PaperModal
        visible={true}
        onDismiss={onCloseModal}
        statusBarTranslucent={true}
        contentContainerStyle={[
          Style.modalContainer,
          containerStyle,
          {
            position: "absolute",
            top: -30,
            bottom: 0,
            [side]: 0,
            elevation: 5,
          },
        ]}
        style={{ margin: 0 }}>
        <View style={Style.headerContainer}>
          <View style={Style.storeInfoContainer}>
            <Text style={Style.storeInfoText}>{header_title}</Text>
          </View>

          <View style={Style.closeBtnWrapper}>
            <TouchableOpacity onPress={onCloseModal} style={Style.closeBtn}>
              <MaterialComIcon name="close" size={responsiveWidth(2.5)} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Style.divider} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View
            style={{ width: "100%", paddingHorizontal: responsiveWidth(2.5) }}>
            {children}
          </View>
        </ScrollView>
      </PaperModal>
    </Portal>
  );
};

SideModalTemplate.propTypes = {
  side: PropTypes.oneOf(["left", "right"]).isRequired,
  onCloseModal: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
};

export default SideModalTemplate;
