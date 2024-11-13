//  TODO commands here

const commands = [
  {
    name: "add-test",
    description: "adds two numbers",
    options: [
      {
        name: "first-number",
        description: "first number data",
        type: 10,
        // type: ApplicationCommandOptionType.Number,
        required: true,
      },

      {
        name: "second-number",
        description: "second number data",
        type: 10,
        // type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
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
