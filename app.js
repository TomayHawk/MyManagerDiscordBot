import 'dotenv/config';
<<<<<<< HEAD
import { Client, GatewayIntentBits } from 'discord.js';
import { google } from 'googleapis';
=======
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
>>>>>>> parent of 3c36bea (Simplified Discord Bot)

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const KEY_PATH = 'mymanager-service-account.json';
const SPREADSHEET_ID = '1cNDmKyyC4IeDrCC4ktwy49Y3PTAZYbvOkjSv_tvUvAw';
const RANGE = 'Tasks!A2:Z1000';

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

async function addTaskToSheet(taskDetails) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [taskDetails]
      }
    });
    console.log('Task added to Google Sheets');
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

client.once('ready', () => {
  console.log('Bot is online!');
});

<<<<<<< HEAD
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('add ') && !message.author.bot) {
    const taskContent = message.content.slice(4).trim();
    message.channel.send(`Added item: ${taskContent}`);
    console.log(`Variable: ${taskContent}`);

    const taskDetails = [
      taskContent, // Task description
      "default_type",
      "default_priority",
      "default_time_required",
      "default_time_allocation",
      "default_deadline",
      "FALSE", // Completion status
      "default_location",
      "default_notification"
    ];

    // Add the task directly to Google Sheets
    await addTaskToSheet(taskDetails);
=======
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
>>>>>>> parent of 3c36bea (Simplified Discord Bot)
  }
});

client.login(process.env.DISCORD_TOKEN);

// /////// need to learn about cogs
