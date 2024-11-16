//  TODO commands here

const commands = [
  {
    name: "add-debt",
    description: "Creates Debt",
    options: [
      {
        name: "first-number",
        description: "first number data",
        type: 10,
        required: true,
      },
      {
        name: "second-number",
        description: "second number data",
        type: 10,
        required: true,
      },
    ],
  },
  {
    name: "add-mutiple-debt",
    description: "Creates Debt to Group of people",
  },

  {
    name: "send-reminder",
    description: "Sends Dept Reminder",
    options: [
      {
        name: "username",
        description: "UserName of person to be reminded!",
        type: 6,
        required: true,
      },
    ],
  },
  {
    name: "send-embed",
    description: "Embdedddd",
  },
];

module.exports = commands;
