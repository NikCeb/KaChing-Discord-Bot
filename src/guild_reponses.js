// TODO ADD the responses here
import { EmbedBuilder } from "discord.js";
import { add_user, get_user, update_user, delete_user } from "./fs_database.js";

export default async function guild_response(interaction) {
  const command = interaction.commandName;

  if (command === "create-charge") {
    if (interaction.options._subcommand === "charge") {
      await interaction.reply("Getting permissions for a user...");
    } else {
      await interaction.reply("No subcommand found");
    }
  } else if (command === "send-reminder") {
    // console.log(interaction.options._hoistedOptions[0], "[[[");
    console.log(interaction.user, "]]]]");

    sends_private_reminder(interaction);
  } else {
    return "I don't understand. How can I assist you?";
  }
}

async function sends_private_reminder(interaction) {
  const send_id = interaction.user.id;
  const receiver_id = interaction.options._hoistedOptions[0].value;
  const username_sender = interaction.user.username;
  const username_receiver =
    interaction.options._hoistedOptions[0].user.username;

  // TODO : Create a function to get user debt from db.

  const embed = new EmbedBuilder()
    .setTitle("Reminder! Reminder! Reminder!")
    .setDescription("This is a reminder for you to pay your dues")
    .setColor("#00FF00")
    .addFields(
      {
        name: `@${username_sender}`,
        value: `@${send_id}`,
        inline: true,
      },
      {
        name: `@${username_receiver}`,
        value: `@${receiver_id}`,
        inline: true,
      }
    );

  await interaction.reply({ embeds: [embed] });
}
