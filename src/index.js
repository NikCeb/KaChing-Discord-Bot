import { Client, IntentsBitField, ChannelType } from "discord.js";
import dotenv from "dotenv";
import loadEvents from "./utils/loadEvents.js";
import { closeDatabase } from "./database/db_response.js";

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

// Graceful shutdown handler
async function gracefulShutdown(signal) {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  try {
    await closeDatabase();
    client.destroy();
    console.log("Bot shutdown complete");
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown:", error);
    process.exit(1);
  }
}

// Register shutdown handlers
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Load events and login
(async () => {
  try {
    await loadEvents(client);
    await client.login(discord_bot_token);
    console.log("Bot is ready!");
  } catch (error) {
    console.error("Failed to start bot:", error);
    process.exit(1);
  }
})();
