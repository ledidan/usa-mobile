import React, { Component } from "react";

import _get from "lodash.get";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Button,
} from "react-native";
import RNFS from "react-native-fs";

import MaterialCommIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { responsiveWidth } from "react-native-responsive-dimensions";
import DocumentPicker from "react-native-document-picker";

import Style from "./style";
import BotIcon from "assets/Images/bot.png";
import stringSimilarity from "string-similarity";

//Field
import { Modal } from "fields"; //TODO: Implemement LoadingSpinner, SearchBar

// Lib
import { Services } from "lib";
import botReplies from "./constant";

class ChatBot extends Component {
  state = {
    pastOrders: {},
    showSearchBar: false,
    messages: [],
    inputText: "",
    isChatBotVisible: false,
    isBotNextquestion: true,
    nextBotQuestion: "Next bot question text here",
    answeredQuestions: [],
    open_modal: false,
    email: "",
    subject_email: "",
    text_mail: "",
    selectedAttachment: {},
  };
  scrollViewRef = React.createRef();
  toggleChatBot = () => {
    const botReplies = [
      {
        question: "Hello! I'm Skipli Chatbot. How can I assist you today?",
        question_next: [
          "Common errors",
          "How to refund money?",
          "Connect to printer",
          "Create Menu",
          "Connect to email",
        ],
      },
    ];

    if (!this.state.isChatBotVisible && this.state.messages.length === 0) {
      const botMessages = [];

      botReplies.forEach(reply => {
        botMessages.push({
          text: reply.question,
          user: "bot",
          isQuestion: false,
        });

        reply.question_next.forEach(question => {
          botMessages.push({
            text: question,
            user: "bot",
            isQuestion: true,
          });
        });
      });

      this.setState(prevState => ({
        messages: [...prevState.messages, ...botMessages],
        isChatBotVisible: true,
      }));
    } else {
      this.setState({ isChatBotVisible: true });
    }
  };

  handleSendMessage = text => {
    if (text.trim() === "") {
      return;
    }

    const newMessage = { text, user: "user" };
    const updatedMessages = [...this.state.messages, newMessage];

    this.setState(
      {
        messages: updatedMessages,
        inputText: "",
      },
      () => {
        if (newMessage.user === "user") {
          this.handleBotReply(text);
        }
        if (this.scrollViewRef.current) {
          this.scrollViewRef.current.scrollToEnd({ animated: true });
        }
      },
    );
  };

  handleBotReply = userQuestion => {
    
  
    const similarQuestions = botReplies.map(reply => ({
      question: reply.question,
      similarity: stringSimilarity.compareTwoStrings(
        userQuestion.toLowerCase(),
        reply.question.toLowerCase()
      ),
    })).filter(({ similarity }) => similarity >= 0.7);
  
    similarQuestions.sort((a, b) => b.similarity - a.similarity);
  
    if (similarQuestions.length > 0) {
      const { question, answers, question_next } = botReplies.find(
        reply => reply.question === similarQuestions[0].question
      );
  
      if (userQuestion === "I'd done goodbye") {
        this.setState({
          messages: [],
          isChatBotVisible: false,
          open_modal: true,
        });
      } else if (userQuestion === "Connect to email") {
        this.props.handleOpenModal();
      }
  
      const botMessages = answers.map(answer => ({
        text: answer,
        user: "bot",
        isQuestion: false,
      })).concat(question_next.map(question => ({
        text: question,
        user: "bot",
        isQuestion: true,
      })));
  
      this.setState(prevState => ({
        messages: [...prevState.messages, ...botMessages],
      }));
    } else {
      const newBotMessage = { text: "Sorry, I don't understand this question.", user: "bot" };
      this.setState(prevState => ({
        messages: [...prevState.messages, newBotMessage],
      }));
    }
  };
  
  closeChatBot = () => {
    this.setState({ isChatBotVisible: false });
  };
  renderHeader = () => {
    return (
      <View style={Style.headerContainer}>
        <View style={Style.header}>
          <Image style={Style.brandImage} source={BotIcon} />
          <Text style={Style.headerText}>Chat Bot</Text>
        </View>
        <TouchableOpacity onPress={this.closeChatBot} style={Style.closeButton}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
            X
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderMessages = () => {
    return this.state.messages.map((message, index) => (
      <View
        key={index}
        style={
          message.user === "user"
            ? Style.userMessage
            : message.user === "bot" && message.isQuestion
            ? [Style.question, { flexDirection: "row" }]
            : Style.botMessage
        }>
        {message.user === "user" ? (
          <Text style={Style.fontText}>{message.text}</Text>
        ) : (
          <View>
            {message.isQuestion ? (
              <TouchableOpacity
                onPress={() => this.handleSendMessage(message.text)}>
                <Text style={Style.fontText}>{message.text}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={Style.fontText}>{message.text}</Text>
            )}
          </View>
        )}
      </View>
    ));
  };

  render() {
    const { isFetchingOrders ,initialOrdersLoaded} = this.props;
    if (!isFetchingOrders&&initialOrdersLoaded) {
      return (
        <View>
          <TouchableOpacity
            style={Style.chat_bot_button}
            onPress={this.toggleChatBot}>
            <Text style={{ color: "white" }}>
              <MaterialCommIcon
                name="frequently-asked-questions"
                size={responsiveWidth(2)}
              />
            </Text>
          </TouchableOpacity>
          {this.state.isChatBotVisible && (
            <View style={Style.chatBotContainer}>
              {this.renderHeader()}
              <ScrollView
                ref={this.scrollViewRef}
                style={Style.chatBotMessageBox}>
                {this.renderMessages()}
              </ScrollView>
              <View style={Style.chatBotInputContainer}>
                <View style={Style.chatBotInputWrapper}>
                  <TextInput
                    style={Style.chatBotInput}
                    placeholder="Input question"
                    value={this.state.inputText}
                    onChangeText={text => this.setState({ inputText: text })}
                  />
                  <TouchableOpacity
                    style={Style.sendMessageButton}
                    onPress={() =>
                      this.handleSendMessage(this.state.inputText)
                    }>
                    <Text style={{ color: "black" }}>
                      <Ionicons name="send" size={responsiveWidth(2)} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      );
    } else {
      return null;
    }
  }
}

export default ChatBot;
