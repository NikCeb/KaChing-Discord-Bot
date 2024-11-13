// TODO FIX COMMANDS AND CLEAN
require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
const commands_list = require("./commands.js");

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
