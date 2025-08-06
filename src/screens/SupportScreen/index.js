import React, { Component } from "react";
import _get from "lodash.get";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { Text, View, FlatList, Image, ScrollView } from "react-native";
import {
  Title,
  Button,
  Headline,
  Card,
  Caption,
  // TextInput as PaperInput,
} from "react-native-paper";
import {
  _createEmailRequestToSkipli,
  _formatPhoneNumber,
} from "./HelperFunctions";

import Form from "./Form";

//Icon
import { SkipliLogoWithTextIcon } from "assets/Icons";
import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";

//context
import { MerchantInterfaceConsumer, withContext } from "context";

//lib
import { Services, Functions } from "lib";

//field
import { DateRangePicker, TimePicker, Dropdown, Input } from "fields";
const { TextInput } = Input;

//component
import { Header } from "components";

//style
import colors from "styles/_variables";
import Style from "./style";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
const INIT_STATE = {
  isReport: false,
  selectedDate: "",
  selectedtime: "",
  desc: "",
  requestId: "",
  phoneNumber: "",
  issue: "",
  openDD: false,
};

const ISSUES = [
  { value: "Manage orders", label: "Manage Orders" },
  { value: "Connect with printers", label: "Connect with printers" },
  { value: "Payment", label: "Payment" },
  { value: "Refund", label: "Refund" },
  { value: "Others", label: "Others" },
];
export class SupportScreen extends Component {
  pages = [
    {
      id: "request-support-screen",
      page: () => this.renderRequestSupportScreen(),
    },
    { id: "issue-screen", page: () => this.renderIssueScreen() },
    { id: "thank-you-screen", page: () => this.renderThankYouScreen() },
  ];
  state = INIT_STATE;
  onBlurListener;
  listRef = React.createRef(null);

  componentDidMount() {
    const { navigation } = this.props;
  }
  componentWillUnmount() {
    this.onBlurListener && this.onBlurListener();
    this.setState = () => {
      return;
    };
  }
  onReset = () =>
    this.setState(INIT_STATE, () =>
      this.listRef.current.scrollToIndex({ index: 0 }),
    );
  onRequest = ({ isReport = true }) => {
    this.setState({ isReport });
    this.listRef.current.scrollToIndex({ index: 1 });
  };
  onSelectDate = ({ selectedDate = "" }) => this.setState({ selectedDate });

  onSelectTime = ({ selectedTime = "" }) => this.setState({ selectedTime });

  onSelectIssue = issue => this.setState({ issue });

  onToggleDD = () => this.setState({ openDD: !this.state.openDD });

  onChangeDesc = desc => this.setState({ desc });
  onChangePhoneNumber = phoneNumber => {
    const formattedPhoneNumber = _formatPhoneNumber(phoneNumber);
    this.setState({ phoneNumber: formattedPhoneNumber });
  };
  onBackToHome = () => {
    // this.props.navigation.navigate("LiveOrders");
    this.onReset();
  };
  onSendRequestToSkipli = async () => {
    const { selectedDate, selectedtime, desc, issue, phoneNumber, isReport } =
      this.state;
    const { BUTI } = Services;
    const { SendEmail } = BUTI.PostRequests;
    const { personnel, shopBasicInfo } = this.props.context;
    const { id = "" } = shopBasicInfo;

    const isFilled = isReport
      ? desc && issue && phoneNumber
      : selectedDate && selectedtime && desc && issue && phoneNumber;
    if (!isFilled) {
      const { ShowConfirmNotif } = Functions;
      ShowConfirmNotif({
        title: "Missing require information",
        message: "Please fill out the require fields",
        type: "error",
        props: { displayType: "error" },
        options: { autoHide: true, visibilityTime: 2000 },
      });
      return;
    }
    const requestId = nanoid(12);
    const { email_body, email_subject } = _createEmailRequestToSkipli({
      ...this.state,
      personnel,
      shopBasicInfo,
      id: requestId,
    });
    this.setState({ requestId });
    try {
      await SendEmail({
        addresses: ["support@skiplinow.com"],
        subject: email_subject,
        body: email_body,
        shop_id: id,
      });
      this.listRef.current.scrollToIndex({ index: 2 });
    } catch {}
  };

  renderRequestItem = ({ source, title, desc, btnLabel, callback }) => (
    <Card
      mode="elevated"
      elevation={2}
      style={Style.requestCardItem}
      onPress={callback}>
      <Card.Content style={Style.requestCardItemContent}>
        <Image
          source={source}
          style={Style.requestItemImg}
          color={colors.info}
        />
        <View style={Style.requestItemContent}>
          <Title style={Style.requestItemTitle}>{title}</Title>
          <Caption style={Style.requestItemDesc} numberOfLines={3}>
            {desc}
          </Caption>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="elevated"
          icon="arrow-right"
          labelStyle={Style.btnLabel}
          contentStyle={{ flexDirection: "row-reverse", marginBottom: 5 }}>
          {btnLabel}
        </Button>
      </Card.Actions>
    </Card>
  );
  renderDDIssues = () => {
    return (
      <View style={{ width: "100%" }}>
        <Dropdown
          label="You have issue with..."
          data={ISSUES}
          mode="outlined"
          value={this.state.issue}
          visible={this.state.openDD}
          onValueChange={this.onSelectIssue}
          inputStyle={Style.textInput}
          dropDownStyle={{ marginTop: "3%", borderRadius: 0 }}
          outlineColor={colors.info}
        />
      </View>
    );
  };
  renderRequestSupportScreen = () => {
    return (
      <View style={Style.suportContainer}>
        <Header header="How can we help?" />
        <ScrollView
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}>
          {this.renderRequestItem({
            source: require("assets/Images/report-issue.png"),
            title: "Report an Issue",
            desc: "Submit a form or briefly describe your issue",
            btnLabel: "Report an Issue",
            callback: () => this.onRequest({ isReport: true }),
          })}
          {this.renderRequestItem({
            source: require("assets/Images/schedule-meeting.png"),
            title: "Schedule a Meeting",
            desc: "Connect with a technician for quick support",
            btnLabel: "Schedule a Meeting",
            callback: () => this.onRequest({ isReport: false }),
          })}
        </ScrollView>
      </View>
    );
  };
  renderIssueScreen = () => {
    const { timeZone, name } = _get(this.props, "context.shopBasicInfo");
    return (
      <View style={Style.pageContainer}>
        <Button
          icon="arrow-left"
          mode="elevated"
          style={Style.backBtn}
          labelStyle={Style.btnLabel}
          onPress={this.onReset}>
          Back
        </Button>
        <View style={{ paddingHorizontal: 20, width: "70%" }}>
          <Form
            isReport={this.state.isReport}
            timeZone={timeZone}
            name={name}
            issue={this.state.issue}
            openDD={this.state.openDD}
            phoneNumber={this.state.phoneNumber}
            desc={this.state.desc}
            onSelectDate={this.onSelectDate}
            onSelectTime={this.onSelectTime}
            onChangePhoneNumber={this.onChangePhoneNumber}
            onChangeDesc={this.onChangeDesc}
            onSelectIssue={this.onSelectIssue}
            onSendRequestToSkipli={this.onSendRequestToSkipli}
          />
        </View>
      </View>
    );
  };
  renderThankYouScreen = () => {
    return (
      <View style={Style.thankScreenContainer}>
        <View style={Style.thankScreenContent}>
          <SkipliLogoWithTextIcon
            height={responsiveHeight(10)}
            width={responsiveWidth(15)}
          />
          <MaterialComIcon
            name="check-circle"
            size={responsiveHeight(10)}
            color={colors.success}
          />
          <Headline style={Style.thankHeadline}>
            Thank you for contacting us
          </Headline>
          <Title style={Style.thankTitle}>
            Your request has been submitted
          </Title>
          <Text style={Style.requestIDText}>
            Your request ID: {this.state.requestId}
          </Text>
          <Button
            mode="contained"
            style={Style.thankBtn}
            labelStyle={Style.btnLabel}
            onPress={this.onBackToHome}>
            Go Back
          </Button>
        </View>
      </View>
    );
  };
  renderItems = ({ item }) => {
    return item.page();
  };
  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={this.pages}
          ref={this.listRef}
          keyExtractor={item => item.id}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(SupportScreen);
