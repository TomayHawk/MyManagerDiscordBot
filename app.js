import 'dotenv/config';
import { Client, GatewayIntentBits, ActionRowBuilder, InteractionType, ModalBuilder } from 'discord.js';
import { google } from 'googleapis';

import {
  taskTypeDropdown,
  taskPriorityDropdown,
  taskCategoryDropdown,
  taskDifficultyDropdown,
  taskTimeRequiredDropdown,
  taskNotification1Dropdown,
  taskNotification2Dropdown,
  moreDetailsButton,
  submitTaskButton,
  taskTimeAllocation,
  taskDeadline,
  taskLocation,
  taskNotes
} from './components.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: ['CHANNEL', 'MESSAGE', 'USER']
});

const KEY_PATH = 'mymanager-service-account.json';
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE = 'Tasks!A2:Z1000';

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

let firstResponse;
let secondResponse;
let taskDetails = ['defaultTask', 'Task', 'Medium', 'Personal', 'Medium', '-', '30 minutes', '-', '-', 'FALSE', '-', '-', '-'];

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
    console.error('Error adding task', error);
  }
}

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('add ') && !message.author.bot) {
    const taskContent = message.content.slice(4).trim();
    taskDetails = [taskContent, 'Task', 'Medium', 'Personal', 'Medium', '-', '30 minutes', '-', '-', 'FALSE', '-', '-', '-'];

    firstResponse = await message.channel.send({
      content: `Adding task: ${taskContent}. Please choose details:`,
      components: [
        new ActionRowBuilder().addComponents(taskTypeDropdown),
        new ActionRowBuilder().addComponents(taskPriorityDropdown),
        new ActionRowBuilder().addComponents(taskCategoryDropdown),
        new ActionRowBuilder().addComponents(taskDifficultyDropdown),
        new ActionRowBuilder().addComponents(taskTimeRequiredDropdown)
      ]
    });
    secondResponse = await message.channel.send({
      components: [
        new ActionRowBuilder().addComponents(taskNotification1Dropdown),
        new ActionRowBuilder().addComponents(taskNotification2Dropdown),
        new ActionRowBuilder().addComponents(moreDetailsButton, submitTaskButton)
      ]
    });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isStringSelectMenu()) {
    await interaction.deferUpdate();

    const customIdToIndex = {
      taskType: 1,
      taskPriority: 2,
      taskCategory: 3,
      taskDifficulty: 4,
      taskTimeRequired: 6,
      taskNotification1: 11,
      taskNotification2: 12
    };

    if (customIdToIndex[interaction.customId] !== undefined) {
      taskDetails[customIdToIndex[interaction.customId]] = interaction.values[0];
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === 'moreDetails') {
      const taskModal = new ModalBuilder()
        .setCustomId('taskModal')
        .setTitle('Add Task Details');

      taskModal.addComponents(
        new ActionRowBuilder().addComponents(taskTimeAllocation),
        new ActionRowBuilder().addComponents(taskDeadline),
        new ActionRowBuilder().addComponents(taskLocation),
        new ActionRowBuilder().addComponents(taskNotes)
      );

      interaction.showModal(taskModal);
    } else if (interaction.customId === 'submitTask') {
      await interaction.deferUpdate();

      firstResponse.delete();
      secondResponse.delete();
      addTaskToSheet(taskDetails)
      interaction.followUp({ content: 'Task added successfully!', ephemeral: true });
    }
  } else if (interaction.isModalSubmit() && interaction.customId === 'taskModal') {
    await interaction.deferUpdate();

    taskDetails[7] = interaction.fields.getTextInputValue('taskTimeAllocation') || '-';
    taskDetails[8] = interaction.fields.getTextInputValue('taskDeadline') || '-';
    taskDetails[10] = interaction.fields.getTextInputValue('taskLocation') || '-';
    taskDetails[5] = interaction.fields.getTextInputValue('taskNotes') || '-';
  }
});

client.login(process.env.DISCORD_TOKEN);
