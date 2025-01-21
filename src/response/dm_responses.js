// TODO ADD the responses here
import { EmbedBuilder } from "discord.js";
import { manageRecords } from "../response_db/db_response.js";

export default async function dm_response(message) {
  if (message.content.toLowerCase() === "help!") {
    await help(message);
  } else if (message.content.toLowerCase() === "get-debt") {
    await get_debt(message);
  } else {
    try {
      await message.author.send(
        "Thanks for messaging me directly! How can I assist you? \nType 'help!' for more information."
      );
    } catch (error) {
      console.error("Failed to send a reply:", error);
    }
  }
}

async function help(message) {
  const embed = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Basic Commands to use KaChing Bot")
    .addFields(
      { name: "Make Charges", value: "/create-charge", inline: true },
      { name: "Send Reminder", value: "/send-reminder", inline: true },
      { name: "Pay Charges", value: "/pay-charge", inline: true }
    )
    .setAuthor({ name: "KaChing Bot" });
  try {
    await message.author.send({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}

async function get_debt(message) {
  const userDetails = {
    amount: "",
    lenderID: "",
    lenderName: "",
    borrowerID: userID_borrower,
    borrowerUsername: userName_borrower,
  };

  const loanData = await manageRecords("read", userDetails);

  const debts = new EmbedBuilder()
    .setTitle("Reminder! Reminder! Reminder!")
    .setDescription("This is a reminder for you to pay your dues.", "\u200B")
    .setColor("#00FF00")
    .setFooter({
      text: "KaChing Discord Bot",
      iconURL: interaction.client.user.displayAvatarURL(),
    });
  if (Array.isArray(loanData)) {
    for (const loan of loanData) {
      debts.addFields(
        { name: "Amount", value: loan.amount.toString() },
        { name: "Lender ID", value: loan.lenderID },
        { name: "Lender Name", value: loan.lenderName },
        { name: "Borrower ID", value: loan.borrowerID },
        { name: "Borrower Name", value: loan.borrowerName },
        { name: "\u200B", value: "\u200B", inline: true }
      );
    }
  } else {
    debts.addFields({ name: "Loan Debt", value: "No Pending Balance" });
  }
  try {
    await message.author.send({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}
