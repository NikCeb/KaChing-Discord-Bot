//  TODO ADD HELP COMMAND

const commands_list = [
  {
    name: "create-charge",
    description: "Create Charges for a user",
    options: [
      {
        name: "charge",
        description: "Create single charges for a user",
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
];

export default commands_list;
