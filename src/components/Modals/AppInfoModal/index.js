import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { Modal } from "fields";
import AppDetails from "components/AppDetails";

class AppInfoModal extends Component {
  render() {
    const { isVisible, onClose } = this.props;
    if (!isVisible) return null;
    return (
      <Modal
        contentLabel="App Info"
        headerProps={{ showHeader: false }}
        onCloseModal={onClose}
        modalStyle={{
          modalContainer: {
            marginHorizontal: "25%",
            height: "75%",
            width: "40%",
          },
          contentContainer: {
            padding: 20,
            minWidth: "100%",
          },
        }}>
        <ScrollView>
          <AppDetails showInCard={false} />
          <View style={styles.btnContainer}>
            <Button
              mode="outlined"
              onPress={onClose}
              labelStyle={styles.btnLabel}
              style={styles.btn}>
              Close
            </Button>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  btn: {
    width: 100,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  btnLabel: {
    fontSize: 13,
    height: "100%",
    textAlignVertical: "center",
  },
});

export default AppInfoModal;
