export default {
  commandData: {
    name: "charge",
    description:
      "Manage user debts by creating, updating, or completing charges",
    options: [
      {
        name: "create-charge",
        description: "Create a loan charge for a user",
        type: 1,
        options: [
          {
            name: "user-name",
            description: "The user to charge",
            type: 6,
            required: true,
          },
          {
            name: "amount",
            description: "The amount to charge",
            type: 10,
            required: true,
          },
        ],
      },
      {
        name: "pay-charge",
        description: "Record a payment for a user's borrowed amount",
        type: 1,
        options: [
          {
            name: "user-name",
            description: "The user making the payment",
            type: 6,
            required: true,
          },
          {
            name: "amount",
            description: "The amount being paid",
            type: 10,
            required: true,
          },
          {
            name: "date",
            description: "The date of the payment",
            type: 3,
            required: true,
          },
        ],
      },
    ],
  },
};
