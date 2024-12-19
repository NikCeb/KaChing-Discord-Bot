// TODO ADD the responses here
import { EmbedBuilder } from "discord.js";
import { manageRecords } from "./response_db/db_database.js";

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

  const embed = new EmbedBuilder()
    .setTitle("Reminder! Reminder! Reminder!")
    .setDescription("This is a reminder for you to pay your dues.")
    .setColor("#00FF00")
    .addFields(
      {
        name: "Sender",
        value: `@${username_sender} (${send_id})`,
        inline: true,
      },
      {
        name: "Receiver",
        value: `@${username_receiver} (${receiver_id})`,
        inline: true,
      }
    )
    .setTimestamp({ getUTCDate: true })
    .setFooter({
      text: "KaChing Discord Bot",
      iconURL: interaction.client.user.displayAvatarURL(),
    });

  await interaction.reply({ embeds: [embed] });
}
