import { Client, IntentsBitField, ChannelType } from "discord.js";
import dotenv from "dotenv";
import guild_response from "./services/guild_reponses.js";
import dm_response from "./services/dm_responses.js";
import botCommands from "./register-commands.js";

dotenv.config();
const discord_bot_token = process.env.BOT_TOKEN;

if (!discord_bot_token) {
  console.error("BOT_TOKEN is not defined in the environment variables.");
  process.exit(1);
}

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

// Listener using Ready to tell if bot is running.
client.once("ready", (c) => {
  botCommands();
  console.log(`RUNNING ${c.user.tag} (${c.user.id}) is HERE`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.channel.type === ChannelType.DM) {
    try {
      await dm_response(message);
    } catch (error) {
      console.error("Failed to send a reply in DM:", error);
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await guild_response(interaction);
  } catch (error) {
    console.error("Failed to send a reply to interaction:", error);
  }
});

client.login(discord_bot_token);
