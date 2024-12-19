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
  const debts = await manageRecords("read", message.author.id);
  debts.forEach((debt) => {
    console.log(debt.col);
  });
  const embed = new EmbedBuilder()
    .setTitle("Your Balance")
    .setDescription("Basic Commands to use KaChing Bot")
    .setAuthor({ name: "KaChing Bot" });
  debts.forEach((debt) => {
    embed.addFields({ name: "Debt", value: debt.col });
  });
  try {
    await message.author.send({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}
