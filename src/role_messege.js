import { Client, IntentsBitField, ChannelType } from "discord.js";
import dotenv from "dotenv";
import guild_response from "./guild_reponses.js";
import dm_response from "./dm_responses.js";
import botCommands from "./register-commands.js";

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

const roles = [{ id: "123456789", name: "role1" }];

//  Listener using Ready to tell if bot is running.
client.once("ready", (c) => {
  botCommands();
  console.log(`RUNNING ${c.user.tag} ${c.user.id} ${c.user.username} is HERE`);
});
