import { Client, IntentsBitField, ChannelType } from "discord.js";
import dotenv from "dotenv";
import loadEvents from "./utils/loadEvents.js";

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

loadEvents(client);

client.login(discord_bot_token);
