import { EmbedBuilder } from "discord.js";
import { manageRecords } from "../database_response/db_response.js";

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
    loanData.slice(0, 4).forEach((loan) => {
      this.embed.addFields(
        {
          name: `Loan on ${new Date(loan.date).toDateString() || ""}`,
          value: `Php ${loan.amount.toString()} owed to -> ${loan.lenderName}`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true }
      );
    });
  } else {
    debts.addFields({ name: "Loan Debt", value: "No Pending Balance" });
  }
  try {
    await message.author.send({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}

async function help(message) {
  const embed = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Basic Commands to use KaChing Bot")
    .addFields(
      { name: "Make Charges", value: "/balance", inline: true },
      { name: "Pay Charges", value: "/pay-charge", inline: true }
    )
    .setAuthor({ name: "KaChing Bot" });
  try {
    await message.author.send({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}
