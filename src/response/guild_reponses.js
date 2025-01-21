// TODO ADD the responses here
import { EmbedBuilder } from "discord.js";
import { manageRecords } from "../response_db/db_response.js";

export default async function guild_response(interaction) {
  const command = interaction.commandName;

  if (command === "create-charge") {
    if (interaction.options._subcommand === "charge") {
      await interaction.reply("Getting permissions for a user...");
    } else {
      await interaction.reply("No subcommand found");
    }
  } else if (command === "send-reminder") {
    sends_private_reminder(interaction);
  } else {
    await help();
  }
}

async function sends_private_reminder(interaction) {
  const userID_lender = interaction.user.id;
  const userName_lender = interaction.user.username;
  const userID_borrower = interaction.options._hoistedOptions[0].value;
  const userName_borrower =
    interaction.options._hoistedOptions[0].user.username;

  const userDetails = {
    amount: "",
    lenderID: userID_lender,
    lenderName: userName_lender,
    borrowerID: userID_borrower,
    borrowerUsername: userName_borrower,
  };
  console.log(userDetails);
  const loanData = await manageRecords("read", userDetails);

  const debts = new EmbedBuilder()
    .setAuthor({
      name: "KaChing Bot",
      iconURL: `KaChing-Discord-Bot/images/KaChingBot.jpg`,
    })
    .setTitle("Reminder! Reminder! Reminder!")
    .setDescription("This is a reminder for you to pay your dues.")
    .setColor("#00FF00")
    .setTimestamp()
    .setFooter({
      text: "KaChing Discord Bot",
      iconURL: `KaChing-Discord-Bot/images/burn_the_money_danny_devito.gif`,
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

  await interaction.reply({ embeds: [debts] }, { ephemeral: true });
}

async function help() {
  const help = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Basic Commands to use KaChing Bot")
    .addFields(
      { name: "Make Charges", value: "/create-charge", inline: true },
      { name: "Send Reminder", value: "/send-reminder", inline: true },
      { name: "Pay Charges", value: "/pay-charge", inline: true }
    )
    .setAuthor({ name: "KaChing Bot" });
  try {
    await interaction.reply({ embeds: [help] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}
