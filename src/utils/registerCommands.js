import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import "dotenv/config";
import { REST, Routes } from "discord.js";

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

async function registerCommands() {
  try {
    const commands = await getCommands();
    await rest.put(
      // GLOBAL COMMANDS
      Routes.applicationCommands(process.env.CLIENT_ID),
      // USE THIS FOR TESTING OR GUILD-WIDE COMMANDS
      // Routes.applicationGuildCommands(
      //   process.env.CLIENT_ID,
      //   process.env.GUILD_ID
      // ),
      { body: commands }
    );
    console.log(`✅ Successfully registered commands!`);
  } catch (error) {
    console.error(`❌ Error registering commands:`, error);
  }
}

async function getCommands() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const commandsList = [];
  const foldersPath = path.join(__dirname, "..", "commands");

  if (!fs.existsSync(foldersPath)) return commandsList;

  const commandCategories = fs.readdirSync(foldersPath);
  const importPromises = commandCategories.flatMap((category) => {
    const categoryPath = path.join(foldersPath, category);
    const commandFiles = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".js"));

    return commandFiles.map((file) => {
      const filePath = `file://${path.join(categoryPath, file)}`;

      return import(filePath)
        .then((index) => {
          if (index.default && index.default.commandData) {
            commandsList.push(index.default.commandData);
            // console.log(
            //   `✅ Loaded command: ${index.default.commandData.name} from ${category}/${file}`
            // );
          } else {
            console.warn(`⚠️ Skipping invalid command file: ${filePath}`);
          }
        })
        .catch((error) => {
          console.error(`❌ Failed to load command at ${filePath}:`, error);
        });
    });
  });

  await Promise.all(importPromises);
  return commandsList;
}

export default registerCommands;
