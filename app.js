import 'dotenv/config';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', (message) => {

  // Check if the message starts with "add" and is not sent by a bot
  if (message.content.startsWith('add ') && !message.author.bot) {
    console.log(`here`);

    // Extract the string after "add "
    const input = message.content.slice(4).trim();

    // Save the input to a variable
    let inputTask = input;
    // /////// let inputDuration = input;
    // /////// let inputTime = input;

    // Optional: send confirmation in the chat
    message.channel.send(`Added item: ${inputTask}`);

    // Log the variable for debugging
    console.log(`Variable: ${inputTask}`);
  }
});

client.login(process.env.DISCORD_TOKEN);

// /////// need to learn about cogs
