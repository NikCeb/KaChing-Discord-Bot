// TODO ADD the responses here
import { EmbedBuilder } from "discord.js";

export default function dm_response(message) {
  if (message.content === "help!") {
    return help();
  } else if (message.content === "get-debt") {
    return get_debt();
  } else {
    return "Thanks for messaging me directly! How can I assist you? \n Type ->'help!'<- for more information.";
  }
}

function sends_private_reminder(userID_sender) {
  // TODO: Implement sends_private_reminder function
  // Client.users.get("User ID here").send("Message to Send")
}

async function help() {
  const embed = new EmbedBuilder()
    .setTitle("Help")
    .setDescription("Basic Commands to use KaChing Bot")
    .addFields(
      { name: "Make Charges", value: "/create-charge", inline: true },
      { name: "Send Reminder", value: "/send-reminder", inline: true }
    )
    .setAuthor("KaChing Bot");
  try {
    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Failed to send a reply:", error);
  }
}

function get_debt(userID_sender, purpose) {
  // TODO: Implement get_debt function
  // Connect to database and get the debt of the user
}
