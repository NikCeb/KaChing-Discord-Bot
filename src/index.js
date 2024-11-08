const { Client, IntentsBitField } = require('discord.js');
const dotenv = require('dotenv').config();

const discord_bot_token = process.env.BOT_TOKEN

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', (c) => {
    console.log(`RUNNING ${c.user.tag} ${c.user.id} ${c.user.username} is HERE`);
});


client.on('messageCreate', (message) => {
    // Catches self looping chat
    if (message.author.bot) {
        return;
    }

    if (message.content === 'hello' ){
        message.reply('hello');
    }

    console.log(`Message is ${message.content} ${message.member} from ${message.guild}`);
});

client.login(discord_bot_token);

