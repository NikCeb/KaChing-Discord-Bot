// TODO FIX COMMANDS AND CLEAN
import "dotenv/config";
import { REST, Routes, ApplicationCommandOptionType } from "discord.js";
import commands_list from "./commands/commands.js";

const commands = commands_list;

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(`Succesfully Added Commands!`);
  } catch (error) {
    console.log(`Error Command Adding - ${error}`);
  }
})();
