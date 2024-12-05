//  TODO ADD HELP COMMAND

const commands_list = [
  {
    name: "charge",
    description: "Create / Update / Complete user debt",
    options: [
      {
        name: "create-charge",
        description: "Create charge of a user",
        type: 1,
        options: [
          {
            name: "user-name",
            description: "User to Charge",
            type: 6,
            required: true,
          },
          {
            name: "amount",
            description: "Amount to Charge",
            type: 10,
            required: true,
          },
        ],
      },
      {
        name: "update-charge",
        description: "Update debt of a user",
        type: 1,
        options: [
          {
            name: "user-name",
            description: "User to Charge",
            type: 6,
            required: true,
          },
          {
            name: "amount",
            description: "Amount to Charge",
            type: 10,
            required: true,
          },
        ],
      },
      {
        name: "complete-charge",
        description: "Complete debt of a user",
        type: 1,
        options: [
          {
            name: "user-name",
            description: "User to Charge",
            type: 6,
            required: true,
          },
          {
            name: "amount",
            description: "Amount to Charge",
            type: 10,
            required: true,
          },
        ],
      },
    ],
  },

  {
    name: "send-reminder",
    description: "Sends Outstangind Balance Reminder",
    options: [
      {
        name: "user-name",
        description: "UserName of person to be reminded!",
        type: 6,
        required: true,
      },
    ],
  },
  {
    name: "balance",
    description: "Get your current balance",
  },
  {
    name: "leaderboard",
    description: "Get the leaderboard of all users",
  },
  {
    name: "help",
    description: "Get help on how to use the bot",
  },
];

export default commands_list;
