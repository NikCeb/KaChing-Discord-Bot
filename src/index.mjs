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
import dm_response from "./dm_responses.js";

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
      const response = dm_response(message);
      if (!response) {
        response = "I don't understand. Say that again.";
      }
      if (response.identifier === "Reply") {
        await message.channel.send(response.content);
      } else if (response.identifier === "Send") {
        await message.author.send(response.content);
      }
    } catch (error) {
      console.error("Failed to send a reply:", error);
    }
  }
});

// Listens to slash commands only
client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

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
