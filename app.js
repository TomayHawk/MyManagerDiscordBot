import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: ['CHANNEL', 'MESSAGE', 'USER']
});

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', (message) => {
  console.log(`Message: ${message.content}`);
  console.log(`Type: ${message.channel.type}`);
  if (message.content.startsWith('add ') && !message.author.bot) {
    message.channel.send(`Added item: ${message.content.slice(4).trim()}`);
    console.log(`Variable: ${message.content.slice(4).trim()}`);
  }
});

client.login(process.env.DISCORD_TOKEN);

// /////// need to learn about cogs
