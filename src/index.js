const {
  Client,
  IntentsBitField,
  InteractionResponse,
  EmbedBuilder,
  Message,
  ChannelType,

} = require("discord.js");
const dotenv = require("dotenv").config();
const guild_response = require("./guild_reponses.js");
const dm_response = require("./dm_response");

const discord_bot_token = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages,
  ],
  partials: [ChannelType.DM]
  // Need DM and ChannelType for Private Message To Bot
});

//  Listener using Ready to tell if bot is running.
client.once("ready", (c) => {
  console.log(`RUNNING ${c.user.tag} ${c.user.id} ${c.user.username} is HERE`);
});


client.on('messageCreate', async (message) => {
  if (message.author.bot) {
    return;
  }

  // Check if DM 1 = DM 0 = CHANNEL GUILD 
  if (message.channel.type === 1) {
    try {
      // Send a reply in the DM
      await message.channel.send("Thanks for messaging me directly! How can I assist you? \n wdwd");
    } catch (error) {
      console.error("Failed to send a reply:", error);
    }
  }

});

// Listens to slash commands only
client.on("interactionCreate", async (interaction) => {
  // Checks if commands is true
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "add-test") {
    guild_response("hey");
    interaction.channel.send(`Completed, ww ${interaction.guildId} ${interaction.guild}`);
  }

  // Checks for embed temp
  if (interaction.commandName === "send-embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed Title")
      .setDescription("Desription ni ")
      .setColor("Blue")
      .addFields(
        { name: "Field titel", value: "Tested", inline: true },
        { name: "Field titel", value: "Tested", inline: true }
      );

    interaction.reply({ embeds: [embed] });
  }

  console.log(
    `${interaction.commandName} - ${interaction.isChatInputCommand()}`
  );
});

client.login(discord_bot_token);
