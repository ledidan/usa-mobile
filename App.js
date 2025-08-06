import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Root from "./src/navigations";
import customColors from "./src/styles/_variables";
import codePush from "react-native-code-push";
import * as Sentry from "@sentry/react-native";
import { NotifierWrapper } from "react-native-notifier";

Sentry.init({
  dsn: "https://6e92f80d70a2badc82ec88e740d4f386@o4509335811063808.ingest.us.sentry.io/4509335827644416",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,

  // ___DEVELOPMENT ONLY___
  enabled: !__DEV__,
  debug: __DEV__,
  beforeSend(event) {
    if (__DEV__) {
      console.log("[Sentry] Event skipped in dev:", event);
      return null;
    }
    return event;
  },
});

// --- Fetch CodePush metadata immediately and tag Sentry ---
codePush.getUpdateMetadata().then(metadata => {
  if (metadata) {
    Sentry.setContext("codepush_metadata", metadata);
    Sentry.setTag("codepush_label", metadata.label);
    Sentry.setTag("codepush_appVersion", metadata.appVersion);
  }
});

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: customColors.primary,
  },
};

Text.defaultProps = Text.defaultProps || {};
TextInput.defaultProps = TextInput.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps.allowFontScaling = false;

const App = () => {
  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE,
      updateDialog: false,
    });

    codePush.getUpdateMetadata().then(metadata => {
      console.log("CodePush update metadata:", metadata);
    });
  }, []);

  return (
    <NotifierWrapper>
      <PaperProvider theme={theme}>
        <Root.RootStack />
      </PaperProvider>
    </NotifierWrapper>
  );
};

const releaseHistoryFetcher = async () => {
  return [];
};

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  releaseHistoryFetcher: releaseHistoryFetcher,
};

export default Sentry.wrap(codePush(codePushOptions)(App));
