// BUTI DINERS, INC. All right Reserved ©

import React from "react";
import { View } from "react-native";
import { Title, Subheading, Button } from "react-native-paper";
//Style
import Style from "./style.js";

//Fields
import { PageMsg } from "fields";

//Icons
import { SkipliLogoWithTextIcon } from "assets/Icons";

const renderBackBtn = onBack => {
  return (
    <Button
      mode="contained"
      onPress={onBack}
      labelStyle={Style.backBtnLabel}
      style={Style.backBtn}>
      Go Back
    </Button>
  );
};

const LiveShopNotAllowed = ({ onBack }) => (
  <PageMsg>
    <View style={Style.greetingMsg}>
      <SkipliLogoWithTextIcon width={200} height={80} />
      <Title style={Style.greetingTitle}>Access Denined!</Title>
      <Subheading style={Style.greetingText}>
        This shop is only allowed in LIVE mode. Contact Skipli for access.
      </Subheading>
      {renderBackBtn(onBack)}
    </View>
  </PageMsg>
);
const ShopNotExist = ({ onBack }) => (
  <PageMsg>
    <View style={Style.greetingMsg} className={Style.greetingMsg}>
      <SkipliLogoWithTextIcon width={200} height={80} />
      <Title style={Style.greetingTitle}>Shop Not Found!</Title>
      <Subheading style={Style.greetingText}>
        Contact Skipli for your shop.
      </Subheading>
      {renderBackBtn(onBack)}
    </View>
  </PageMsg>
);
const TestShopNotAllowed = ({ onBack }) => (
  <PageMsg>
    <View style={Style.greetingMsg} className={Style.greetingMsg}>
      <SkipliLogoWithTextIcon width={200} height={80} />
      <Title style={Style.greetingTitle}>Access Denied!</Title>
      <Subheading style={Style.greetingText}>
        This shop is only allowed in DEV mode. Contact Skipli for access.
      </Subheading>
      {renderBackBtn(onBack)}
    </View>
  </PageMsg>
);
export { LiveShopNotAllowed, ShopNotExist, TestShopNotAllowed };
