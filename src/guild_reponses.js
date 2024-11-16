// TODO ADD the responses here
import { EmbedBuilder } from "discord.js";

export default function guild_response(interaction) {
  if (interaction.commandName === "send-reminder") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("Desription ni ")
      .setColor("Blue")
      .addFields(
        { name: "Field titel", value: "Tested", inline: true },
        { name: "Field titel", value: "Tested", inline: true }
      );
    return { identifier: "Reply", content: { embeds: [embed] } };
  } else {
    return "I don't understand. How can I assist you?";
  }
}
function sends_private_reminder(userID_sender, userID_receiver) {
  console.log("NA ABUT KO DRI");
  return "debt reminded regie buang";
}
