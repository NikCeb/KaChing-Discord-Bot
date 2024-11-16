import {
  Client,
  IntentsBitField,
  InteractionResponse,
  EmbedBuilder,
  Message,
  ChannelType,
} from "discord.js";
import dotenv from "dotenv";
import guild_response from "./guild_reponses.js";
import dm_response from "./dm_response.js";

dotenv.config();
const discord_bot_token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
  ],
  partials: [ChannelType.DM],
  // Need DM and ChannelType for Private Message To Bot
});

//  Listener using Ready to tell if bot is running.
client.once("ready", (c) => {
  console.log(`RUNNING ${c.user.tag} ${c.user.id} ${c.user.username} is HERE`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.channel.type === 1 || message.channel === "DMChannel") {
    // Send a reply in the DM
    try {
      await message.channel.send(dm_response(message.content));
    } catch (error) {
      console.error("Failed to send a reply:", error);
    }
  }
});

// Listens to slash commands only
client.on("interactionCreate", async (interaction) => {
  try {
    // Checks if commands is true
    if (!interaction.isChatInputCommand()) return;

    // if (interaction.commandName === "add-test") {
    //   guild_response("hey");
    //   await interaction.channel.send(
    //     `Completed, ww ${interaction.guildId} ${interaction.guild}`
    //   );
    // }

    if (interaction) {
      var response = guild_response(interaction);
      if (!response) {
        response = "I don't understand. Say that again.";
      }
      try {
        await interaction.reply(response.content);
        console.log(response.content);
        if (response.identifier === "Reply") {
          await interaction.reply(response.content);
        } else if (response.identifier === "Send") {
          await interaction.channel.send(response.content);
        }
      } catch (error) {
        console.error("Failed to send a reply:", error);
      }
    }
  } catch (error) {
    console.error("An error occurred during interaction:", error);
  }
});

client.login(discord_bot_token);
