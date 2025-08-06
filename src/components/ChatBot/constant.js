const botReplies = [
  {
    question: "FAQ",
    answers: ["Do you have any questions to ask me ?"],
    question_next: ["Question 1", "Question 2"],
  },
  {
    question: "How to refund money?",
    answers: [
      "If you want a refund, you need to click on the past order to find the order that you need to refund -> click on refund -> select the options to refund the customer's correct item. Check the information again and click on request refund",
    ],
    question_next: ["I'd done goodbye", "Go back"],
  },
  {
    question: "Hi",
    answers: [
      "Hello! I'm Skipli Chatbot. Do you have any questions to ask me ?",
    ],
    question_next: [
      "Common errors",
      "Connect to printer",
      "Create Menu",
      "Connect to email",
    ],
  },
  {
    question: "Hello",
    answers: ["Do you have any questions to ask me ?"],
    question_next: [
      "Common errors",
      "Connect to printer",
      "Create Menu",
      "Connect to email",
    ],
  },
  {
    question: "Common errors",
    answers: ["Do you need assistance with anything specific ?"],
    question_next: [
      "Error connecting tablet and printer",
      "Error cannot be automatically accepted",
    ],
  },
  {
    question: "Error cannot be automatically accepted",
    answers: [
      "Please check if the printer is connected because the auto accept function only works when the printer is connected",
    ],
    question_next: ["I'd done goodbye", "Go back"],
  },
  {
    question: "Error connecting tablet and printer",
    answers: [
      "Please check the wifi connection to see if the wifi of the printer and tablet are using the same wifi",
    ],
    question_next: ["I'd done goodbye", "Go back"],
  },
  {
    question: "Connect to printer",
    answers: [
      "You need to click on settings and select add printer -> Choice Connect type -> Choice Printer Brand -> Fill in printer information",
    ],
    question_next: ["I'd done goodbye", "Go back"],
  },
  {
    question: "Go back",
    answers: ["Can I help you with anything else?"],
    question_next: [
      "Common errors",
      "Connect to printer",
      "Create Menu",
      "Connect to email",
    ],
  },
  {
    question: "Create Menu",
    answers: [
      "You need to contact us via email so we can assist you in making the menu",
    ],
    question_next: [
      "Connect to support (678) 999-682",
      "Connect to email",
      "I'd done goodbye",
      "Go back",
    ],
  },
  {
    question: "I'd done goodbye",
    answers: [],
    question_next: [],
  },
  {
    question: "Connect to email",
    answers: ["Please Sent Mail"],
    question_next: ["I'd done goodbye", "Go back"],
  },
];
export default botReplies;
