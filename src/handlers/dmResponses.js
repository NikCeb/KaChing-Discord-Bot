import { EmbedBuilder } from "discord.js";
import { manageRecords } from "../database/db_response.js";

export default async function dm_response(message) {
  const content = message.content.toLowerCase();
  try {
    if (content === "help!") {
      await help(message);
    } else if (content === "balance") {
      await get_debt(message);
    } else {
      await message.author.send(
        "Thanks for messaging me directly! How can I assist you? \nType 'help!' for more information."
      );
    }
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}

async function get_debt(message) {
  const userDetails = {
    amount: "",
    lenderID: "",
    lenderName: "",
    borrowerID: message.author.id,
    borrowerName: message.author.username,
  };

  // Use LIMIT to fetch only the records we need
  const loanData = await manageRecords("read", userDetails, { limit: 4 });

  const debts = new EmbedBuilder()
    .setTitle("Reminder! Reminder! Reminder!")
    .setDescription("This is a reminder for you to pay your dues.")
    .setColor("#00FF00")
    .setFooter({
      text: "KaChing Discord Bot",
      iconURL: message.client.user.displayAvatarURL(),
    });

  if (Array.isArray(loanData) && loanData.length > 0) {
    // Set the correct color for debts
    debts.setColor("#FF0000");

    loanData.forEach((loan) => {
      debts.addFields(
        {
          name: `Loan on ${new Date(loan.date).toDateString() || ""}`,
          value: `Php ${loan.amount.toString()} owed to -> ${loan.lenderName}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true }
      );
    });

    // Add total balance if available
    if (loanData[0]?.balance) {
      debts.setDescription(
        `Your total outstanding balance: Php ${loanData[0].balance.toString()}`
      );
    }
  } else {
    debts.addFields({ name: "Loan Debt", value: "No Pending Balance" });
  }

  try {
    await message.author.send({ embeds: [debts] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}

async function help(message) {
  const embed = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Basic Commands to use KaChing Bot")
    .addFields(
      { name: "Check Balance", value: "balance", inline: true },
      { name: "Get Help", value: "help!", inline: true }
    )
    .setAuthor({ name: "KaChing Bot" });
  try {
    await message.author.send({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}
