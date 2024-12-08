// TODO ADD the responses here
import { EmbedBuilder } from "discord.js";

export default async function dm_response(message) {
  if (message.content.toLowerCase() === "help!") {
    await help(message);
  } else if (message.content.toLowerCase() === "get-debt") {
    await get_debt(message.author.id);
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

function sends_private_reminder(userID_sender) {
  // TODO: Implement sends_private_reminder function
  // Client.users.get("User ID here").send("Message to Send")
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

function get_debt(userID_sender, purpose) {
  // TODO: Implement get_debt function
  // Connect to database and get the debt of the user
}
