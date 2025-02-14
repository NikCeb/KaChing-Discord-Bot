// TODO FIX COMMANDS AND CLEAN
import "dotenv/config";
import { REST, Routes } from "discord.js";
import guildCommands from "../commands/guildCommands.js";

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

async function registerCommands() {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: guildCommands }
    );
    console.log("Successfully registered commands!");
  } catch (error) {
    console.error("Error registering commands:", error);
  }
}

export default registerCommands;
