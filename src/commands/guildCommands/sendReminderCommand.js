export default {
  commandData: {
    name: "send-reminder",
    description: "Send a reminder for outstanding balances",
    options: [
      {
        name: "user-name",
        description: "The user to remind",
        type: 6,
        required: true,
      },
    ],
  },
};
