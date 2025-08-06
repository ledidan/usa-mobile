import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import { set } from "object-path-immutable";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import RNFS from "react-native-fs";
import { base64ArrayBuffer } from "base64-js";
import { ActivityIndicator } from "react-native-paper";
import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import DocumentPicker from "react-native-document-picker";
const { LocalStorage } = Functions;

import {
  _convertDateRangeToUtc,
  FindMatchingOrders,
  SEARCH_CATEGORIES,
} from "./HelperFunctions";
import Style from "./style";
import BotIcon from "assets/Images/bot.png";
import stringSimilarity from "string-similarity";
//Components
import { ChatBot, Orders, ShopOrdersToolbar } from "components"; //TODO: Implement Modals.PastOrderQuickReport

//Field
import { Modal, ScreenContainer } from "fields"; //TODO: Implemement LoadingSpinner, SearchBar
import {
  StarDeviceDiscoveryManagerFactory,
  InterfaceType,
} from "react-native-star-io10";

// Lib
import { Services, Functions } from "lib";
const { OrdersManagement } = Functions;
const { RankPastOrders } = OrdersManagement;
const { Merchants } = Services;
const { GetShopOrders } = Merchants.GetRequests;

//style
import colors from "styles/_variables";

//Context
import { MerchantInterfaceConsumer, withContext } from "context";
import ViewShot from "react-native-view-shot";

class ShopOrders extends Component {
  constructor(props) {
    super(props);
    this.viewShotRef = React.createRef();
    this.state = {
      pastOrders: {},
      selectedTimeRangeID: "today",
      selectedSearchCategory: "customerName",
      showSearchBar: false,
      is_loading: false,
      open_modal: false,
      capturedImage: null,
      printerStatus: "Đang quét thiết bị...",
      hasManuallyChangedDate: false,
    };
  }
  scanPrinters = async () => {
    try {
      const discoveryManager = await StarDeviceDiscoveryManagerFactory.create([
        InterfaceType.Lan,
      ]);

      discoveryManager.onPrinterFound = printer => {
        const info = printer?._information;
        const model = info?._model || "Không có model";
        const ip = info?._detail?._lan?._ipAddress || "Không có IP";

        this.setState({
          printerStatus: `🖨️ Tìm thấy máy in:\nModel: ${model}\nIP: ${ip}`,
        });

        console.log(
          "📦 Toàn bộ object printer:",
          JSON.stringify(printer, null, 2),
        );
      };

      discoveryManager.onDiscoveryFinished = () => {
        console.log("🔍 Quét kết thúc");
        this.setState(prev => ({
          printerStatus: prev.printerStatus.includes("Tìm thấy")
            ? prev.printerStatus
            : "⚠️ Không tìm thấy máy in nào",
        }));
      };

      await discoveryManager.startDiscovery();

      setTimeout(() => {
        discoveryManager.stopDiscovery();
      }, 10000);
    } catch (error) {
      console.error("❌ Lỗi quét máy in:", error);
      this.setState({ printerStatus: `❌ Lỗi: ${error.message}` });
    }
  };

  handleOpenModal = () => {
    this.setState({ open_modal: true });
  };
  pickMultipleAttachments = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, "public.jpeg", "public.png"],
      });

      const selectedAttachments = [];

      for (const result of results) {
        if (result.type.startsWith("image/")) {
          const content = await RNFS.readFile(result.uri, "base64");
          selectedAttachments.push({
            uri: result.uri,
            name: result.name,
            content: content,
          });
        }
      }

      this.setState({ selectedAttachments });
    } catch (err) {
      console.log(err);
    }
  };

  onSendRequestToSkipli = async () => {
    const { BUTI } = Services;
    const { SendEmail } = BUTI.PostRequests;
    const { context } = this.props;
    const { shopID, shopBasicInfo } = context;
    const { name, address } = shopBasicInfo;

    const { selectedAttachments = [] } = this.state;

    try {
      this.setState({ is_loading: true });
      const attachments = selectedAttachments.map(attachment => ({
        filename: attachment.name,
        content: attachment.content,
        contentType: "image/png",
        encoding: "base64",
      }));

      await SendEmail({
        addresses: [
          "phu159123@gmail.com",
          "accounts@skiplinow.com",
          "support@skiplinow.com",
        ],
        subject: `${this.state.subject_email} ${this.state.email} Shop_Id: ${shopID} Name: ${name}`,
        body: `Email: ${this.state.email} \nShop_Id: ${shopID} \nName Restaurant: ${name} \nAddress: ${address} \n ${this.state.text_mail}`,
        attachments,
        shop_id: shopID,
      });

      this.setState({
        open_modal: false,
        is_loading: false,
        subject_email: "",
        email: "",
        text_mail: "",
        selectedAttachments: [],
      });
    } catch (error) {
      this.setState({ is_loading: false });
    }
  };
  areFieldsFilled = () => {
    const { email = "", subject_email = "", text_mail = "" } = this.state;
    const emailRegex = /^.+@.{3,}\.com$/;
    return (
      email.trim() !== "" &&
      subject_email.trim() !== "" &&
      text_mail.trim() !== "" &&
      emailRegex.test(email.trim().toLowerCase())
    );
  };

  renderEmail = () => {
    const { selectedAttachments = [] } = this.state;

    const removeAttachment = index => {
      const updatedAttachments = [...selectedAttachments];
      updatedAttachments.splice(index, 1);
      this.setState({ selectedAttachments: updatedAttachments });
    };
    return (
      <Modal
        contentLabel=""
        modalStyle={{
          modalContainer: Style.modalContainer,
          contentContainer: Style.contentContainer,
        }}
        footerProps={{
          customFooter: (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}>
              <IconButton
                mode="contained"
                style={Style.attachButton}
                labelStyle={Style.btnLabel}
                onPress={this.pickMultipleAttachments}
                icon={({ color }) => (
                  <Entypo
                    name="attachment"
                    size={responsiveWidth(1.5)}
                    color={color}
                  />
                )}
                color={"#fff"}
              />

              <View style={{ flexDirection: "row" }}>
                <Button
                  color="white"
                  mode="contained"
                  labelStyle={[Style.btnLabel, { color: "#006AFF" }]}
                  style={Style.cancelButton}
                  onPress={() => this.setState({ open_modal: false })}>
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  labelStyle={Style.btnLabel}
                  onPress={this.onSendRequestToSkipli}
                  disabled={this.state.is_loading || !this.areFieldsFilled()}
                  style={Style.submitButton}>
                  {this.state.is_loading ? "Loading..." : "Submit"}
                </Button>
              </View>
            </View>
          ),
          showFooter: true,
        }}
        onCloseModal={() => this.setState({ open_modal: false })}>
        <ScrollView>
          <View style={{ flexDirection: "column" }}>
            <TextInput
              style={Style.email_input}
              placeholder="Your Email ( example@gmail.com )"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <TextInput
              style={Style.email_input}
              placeholder="Subject"
              value={this.state.subject_email}
              onChangeText={text => this.setState({ subject_email: text })}
            />
          </View>
          <View>
            <TextInput
              multiline={true}
              style={Style.text_input}
              placeholder="Input text"
              value={this.state.text_mail}
              onChangeText={text => this.setState({ text_mail: text })}
            />
          </View>
          {selectedAttachments.length > 0 && (
            <View style={{ marginTop: 10 }}>
              {selectedAttachments.map((attachment, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    backgroundColor: "#f5f5f5",
                    paddingLeft: 8,
                  }}>
                  <Text>{attachment.name}</Text>
                  <IconButton
                    icon={({ color }) => (
                      <Feather
                        name="x"
                        size={responsiveWidth(2)}
                        color={color}
                      />
                    )}
                    onPress={() => removeAttachment(index)}
                  />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </Modal>
    );
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { endAt, startAt } = this.state;

    if (
      (prevState.endAt !== endAt || prevState.startAt !== startAt) &&
      endAt &&
      startAt
    ) {
      this.onGetPastOrders();
    }
  };

  getOrdersType = () => {
    switch (this.props.orderType) {
      case "activeOrders":
        return "active";
      case "pastOrders":
        return "past";
      default:
        return "";
    }
  };

  onAddRefundRequestToPastOrder = ({
    orderId = "",
    refund_request_id = "",
    request_details = {},
  }) => {
    if (
      !orderId ||
      !refund_request_id ||
      Object.keys(request_details).length === 0
    )
      return;
    this.setState({
      pastOrders: set(
        this.state.pastOrders,
        `${orderId}.refundRequest.${refund_request_id}`,
        request_details,
      ),
    });
  };
  componentDidMount() {
    // this.scanForPrinters();

    if (this.props.orderType === "pastOrders") {
      this.onGetPastOrders();
      // this.props.navigation.addListener('focus', () => {
      //   const {orderStatusHasUpdated} = this.props;
      //   if (orderStatusHasUpdated) this.onGetPastOrders();
      // });
    }
  }
  onChangeDateRange = ({ selectedDayRange, selectedUTCDayRange }) => {
    const timeZone = _get(this.props, "context.shopBasicInfo.timeZone");
    this.setState({ selectedDayRange }, () => {
      const { from_utc, to_utc } = selectedUTCDayRange;
      this.setState({
        endAt: to_utc,
        selectedTimeRangeID: "dateRange",
        startAt: from_utc,
      });
    });
  };

  onChangeSearchText = searchText => {
    this.setState({ searchText }, this.onFindMatchingOrders);
  };

  onChangeTimeRange = ({ endAt, selectedTimeRangeID, startAt }) => {
    this.setState(
      {
        endAt,
        selectedDayRange: { from: null, to: null },
        selectedTimeRangeID,
        startAt,
        hasManuallyChangedDate: true,
      },
      this.onFindMatchingOrders,
    );
  };

  onExpandAllOrders = () =>
    this.setState({ expandAllOrders: !this.state.expandAllOrders });

  onFindMatchingOrders = () => {
    const { pastOrders = {}, searchText } = this.state;
    const { activeOrders = {} } = this.props.context;
    this.setState({
      matchingOrders: !searchText
        ? null
        : FindMatchingOrders({
            filterBy: this.state.selectedSearchCategory,
            orders:
              this.props.orderType === "activeOrders"
                ? activeOrders
                : pastOrders,
            searchText: this.state.searchText,
          }),
    });
  };

  onGetPastOrders = async () => {
    this.setState({ isFetchingOrders: true });
    const { endAt = "", startAt = "" } = this.state;
    const { orders = {} } = await GetShopOrders({
      endAt,
      ordersType: "past",
      shopID: this.props.context.shopID,
      startAt,
    }).finally(() => {
      this.setState({ isFetchingOrders: false });
    });
    this.setState(
      { pastOrders: RankPastOrders(orders) },
      this.onFindMatchingOrders,
    );
  };
  onRefresh = async () => {
    const { orderType = "activeOrders", context } = this.props;
    const { onGetActiveOrders } = context;
    if (orderType === "activeOrders") {
      this.setState({ isFetchingOrders: true });
      await onGetActiveOrders();
      this.setState({ isFetchingOrders: false });
    } else {
      await this.onGetPastOrders();
    }
  };

  onGetOrdersCount = () => {
    const { matchingOrders, pastOrders = {} } = this.state;
    const { activeOrders = {} } = this.props.context;
    if (matchingOrders) return Object.keys(matchingOrders).length;
    return this.props.orderType === "pastOrders"
      ? Object.keys(pastOrders).length
      : Object.keys(activeOrders).length;
  };

  onSelectSearchCategory = selectedSearchCategory =>
    this.setState({ selectedSearchCategory }, () =>
      this.onChangeSearchText(this.state.searchText),
    );
  handleCaptureScreenClick = () => {
    this.props.captureScreen();
  };
  renderContent = () => {
    const { orderType, context, capturedImage } = this.props;

    const { shopBasicInfo } = context;

    const ordersCount = this.onGetOrdersCount();

    const { initialOrdersLoaded } = context;
    const { isFetchingOrders } = this.state;

    return (
      <View>
        <ShopOrdersToolbar
          expandAllOrders={this.state.expandAllOrders}
          onChangeDateRange={this.onChangeDateRange}
          onChangeTimeRange={this.onChangeTimeRange}
          onExpandAllOrders={this.onExpandAllOrders}
          onShowQuickReport={() => this.setState({ showQuickReport: true })}
          ordersCount={ordersCount}
          orderType={orderType}
          selectedDayRange={this.state.selectedDayRange}
          selectedTimeRangeID={this.state.selectedTimeRangeID}
          onRefresh={this.onRefresh}
        />

        {this.renderOrdersList()}

        <ChatBot
          handleOpenModal={this.handleOpenModal}
          isFetchingOrders={isFetchingOrders}
          initialOrdersLoaded={initialOrdersLoaded}
        />
      </View>
    );
  };
  renderOrdersList = () => {
    const { setOrderStatusHasUpdated, context, onSelectScreen } = this.props;
    const { initialOrdersLoaded } = context;
    const { matchingOrders, isFetchingOrders } = this.state;
    if (isFetchingOrders || !initialOrdersLoaded) {
      return (
        // <LoadingSpinner message={"Searching For Orders"} duration={1000} />
        <>
          <ActivityIndicator
            color={"red"}
            size={colors.isSmallScreen ? "small" : "large"}
            style={{ alignSelf: "center", marginTop: "25%" }}
          />
          <Text
            style={{
              alignSelf: "center",
              color: "gray",
              marginTop: "3%",
            }}>{`Loading ${
            this.props.orderType === "activeOrders" ? "Active" : "Past"
          } Orders`}</Text>
        </>
      );
    }
    const { ShopOrders } = Orders;
    const { ShopOrdersList } = ShopOrders;
    let ordersList;
    if (matchingOrders) ordersList = matchingOrders;
    else
      ordersList =
        this.props.orderType === "activeOrders"
          ? this.props.context.activeOrders
          : this.state.pastOrders;
    return (
      <View style={{ marginTop: responsiveHeight(1) }}>
        <ShopOrdersList
          onSelectScreen={onSelectScreen}
          expandAllOrders={this.state.expandAllOrders}
          onAddRefundRequestToPastOrder={this.onAddRefundRequestToPastOrder}
          ordersList={ordersList}
          ordersType={this.getOrdersType()}
          navigation={this.props.navigation}
          setOrderStatusHasUpdated={setOrderStatusHasUpdated}
        />
      </View>
    );
  };

  render() {
    return (
      <ScreenContainer>
        <View>
          {this.renderContent()}
          {this.state.open_modal && this.renderEmail()}
        </View>
      </ScreenContainer>
    );
  }
}

ShopOrders.propTypes = {
  context: PropTypes.shape({
    activeOrders: PropTypes.object,
    shopBasicInfo: PropTypes.object.isRequired,
    shopID: PropTypes.string.isRequired,
  }).isRequired,
};

ShopOrders.defaultProps = {
  context: { activeOrders: {} },
};
export default withContext(MerchantInterfaceConsumer)(ShopOrders);
