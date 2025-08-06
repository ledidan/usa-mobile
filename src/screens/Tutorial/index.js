import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { Card, Button, Title, Caption } from "react-native-paper";
// import MaterialComIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { VideoTutorials, Header } from "components";
import { TUTORIAL_CARDS } from "./HelperFunctions";
//style
import Style from "./style";
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from "react-native-responsive-dimensions";

export class TutorialScreen extends Component {
  state = { videos: [] };
  listRef = React.createRef(null);
  pages = [
    { page: () => this.renderTutorialCards() },
    { page: () => this.renderVideoCards() },
  ];
  listRef = React.createRef(null);

  componentWillUnmount() {
    this.onBlurListener && this.onBlurListener();
    this.setState = () => {
      return;
    };
  }
  onReset = () =>
    this.setState({ videos: [] }, () =>
      this.listRef.current.scrollToIndex({ index: 0 }),
    );
  onSelectTopic = ({ videos = [] }) => {
    this.setState({ videos }, () =>
      this.listRef.current.scrollToIndex({ index: 1 }),
    );
  };
  renderTutorial = ({ item }) => {
    const { imgUri = "", title = "", desc = "", videos = [] } = item;
    return (
      <Card
        mode="elevated"
        elevation={2}
        style={Style.tutorialCard}
        onPress={() => this.onSelectTopic({ videos })}>
        <Card.Cover
          source={imgUri}
          style={{
            width: "100%",
            resizeMode: "contain",
            height: undefined,
            aspectRatio: 16 / 9,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        />
        <Card.Content style={Style.tutorialCardContent}>
          <View>
            <Title style={Style.topicTitle}>{title}</Title>
            <Caption style={Style.topicCaption} numberOfLines={2}>
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
            Select
          </Button>
        </Card.Actions>
      </Card>
    );
  };
  renderTutorialCards = () => {
    return (
      <View style={Style.pageContainer}>
        <Header header="Tutorials" />
        <FlatList
          data={TUTORIAL_CARDS}
          keyExtractor={({ title }, index) => `${title}.${index}`}
          renderItem={this.renderTutorial}
          numColumns={2}
        />
      </View>
    );
  };

  // renderVideo = ({ item }) => {
  //   const { videoId = "", title = "" } = item;
  //   const totalVideos = this.state.videos.length;
  //   return (
  //     <Card
  //       mode="elevated"
  //       elevation={8}
  //       style={[
  //         totalVideos > 1 ? Style.multVideos : Style.oneVideo,
  //         Style.videoCardContainer,
  //       ]}>
  //       <Card.Title
  //         title={title}
  //         titleStyle={Style.videoTitle}
  //         titleNumberOfLines={2}
  //         leftStyle={{
  //           maxWidth: responsiveWidth(3),
  //           maxHeight: responsiveWidth(3),
  //         }}
  //         left={({ size }) => (
  //           <Image
  //             source={{
  //               uri: "https://image.flaticon.com/icons/png/512/3781/3781721.png",
  //             }}
  //             style={{ width: responsiveWidth(3), height: responsiveWidth(3) }}
  //           />
  //         )}
  //       />
  //       <Card.Content>
  //         <VideoTutorials
  //           videoId={videoId}
  //           style={[
  //             { width: "100%" },
  //             totalVideos < 2
  //               ? { height: responsiveHeight(50) }
  //               : { height: responsiveHeight(35) },
  //           ]}
  //         />
  //       </Card.Content>
  //     </Card>
  //   );
  // };

  renderVideo = ({ item }) => {
    const { videoId = "", title = "" } = item;
    return (
      <View style={{ marginLeft: "3%" }}>
        <Text style={Style.videoTitle}>{title}</Text>
        <VideoTutorials videoId={videoId} />
      </View>
    );
  };

  renderVideoCards = () => {
    const totalVideos = this.state.videos.length;
    return (
      <View style={Style.pageContainer}>
        <Button
          icon="arrow-left"
          mode="elevated"
          onPress={this.onReset}
          labelStyle={Style.btnLabel}
          style={Style.backBtn}>
          Back
        </Button>
        {/* <Chip
          icon={({ color }) => (
            <MaterialComIcon
              name="video-box"
              color={color}
              size={responsiveWidth(2)}
            />
          )}
          style={Style.videoChip}
          textStyle={{ fontWeight: "bold", fontSize: responsiveFontSize(1) }}>
          {totalVideos} Video{totalVideos > 1 ? "s" : ""}
        </Chip> */}
        <FlatList
          key={totalVideos}
          data={this.state.videos}
          keyExtractor={(item, index) => index}
          renderItem={this.renderVideo}
          numColumns={totalVideos > 1 ? 2 : 1}
        />
      </View>
    );
  };
  renderItems = ({ item }) => item.page();
  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <FlatList
          horizontal
          ref={this.listRef}
          data={this.pages}
          scrollEnabled={false}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

export default TutorialScreen;
