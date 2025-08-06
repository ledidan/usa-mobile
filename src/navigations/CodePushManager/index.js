// import React, { Component } from "react";
// import CodePush from "react-native-code-push";
// import io from "socket.io-client";
// import { Alert } from "react-native";

// //lib
// import { Functions, Services } from "lib";
// import { Modals } from "components";

// import { Linking } from "react-native";
// const { LocalStorage } = Functions;
// const { SKIPLI_DASHBOARD_SOCKET_IO_URL } = Services;

// const CODE_PUSH_KEYS = {
//   staging: "Q5XNXKCfE4lULbjzYlT-L8qZp4XbFKsKq7XgI",
//   production: "tHDIr4cXS1OITCrFmKpmJRIxLX3C4nqAC2w4N",
// };

// const IS_BETA_MODE = async () => {
//   const isBetaMode = await LocalStorage.getItemFromStorage("BETA_MODE_ENABLED");
//   return isBetaMode === "true";
// };

// const CodePushOptions = {
//   installMode: CodePush.InstallMode.IMMEDIATE,
//   mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
//   updateDialog: {
//     title: "An Update Is Available!",
//     optionalUpdateMessage: "New update is available. Tap Continue to install.",
//     optionalInstallButtonLabel: "Continue",
//     mandatoryContinueButtonLabel: "Continue",
//   },
// };

// class CodePushManager extends Component {
//   socket = io(SKIPLI_DASHBOARD_SOCKET_IO_URL);

//   // componentDidMount() {
//   //   this.onCheckSocketUpdate;
//   //   CodePush.notifyAppReady()
//   //     .then(() => this.onCheckForUpdate())
//   //     .catch(err => console.log("CODE PUSH ERR ==>", err))
//   //     .finally(this.onCheckSocketUpdate);
//   // }

//   // onCheckForUpdate = async () => {
//   //   this.setState({ isUnplugged: true });
//   // };
//   // onStatusChange = (status, deploymemntType) => {
//   //   console.log(
//   //     `${deploymemntType} Code Push status: ${status} \ndetails in here https://github.com/microsoft/react-native-code-push/blob/master/docs/api-js.md#syncstatus`,
//   //   );
//   // };
//   // onCheckSocketUpdate = () => {
//   //   this.socket.on("new-app-version-from-code-push", this.onCheckForUpdate);
//   //   this.socket.on("new-app-version-from-store", this.onCheckForUpdate);
//   // };

//   // onCheckStoreUpdate = () => {
//   //   return (
//   //     this.state.isUnplugged && (
//   //       <Modals.WarningModal
//   //         onCloseModal={() => {}}
//   //         contentDescription="Not Connect to Power Source"
//   //         imgSource={{
//   //           uri: "https://media.giphy.com/media/mPPGsVCvHoQm3LHAA0/giphy.gif",
//   //         }}
//   //         message={`Your tablet is not connecting to a power source.\nPlease check the power connection.`}
//   //       />
//   //     )
//   //   );
//   // };

//   render() {
//     return null;
//   }
// }

// export default CodePush({ checkFrequency: CodePush.CheckFrequency.MANUAL })(
//   CodePushManager,
// );
