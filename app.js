import 'dotenv/config';
import { Client, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionType } from 'discord.js';
import { google } from 'googleapis';

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

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('add ') && !message.author.bot) {
    const taskContent = message.content.slice(4).trim();

    const button = new ButtonBuilder()
      .setCustomId('showModal')
      .setLabel('Add Details')
      .setStyle(ButtonStyle.Primary);

    await message.channel.send({
      content: `You added task: ${taskContent}.`,
      components: [new ActionRowBuilder().addComponents(button)],
    });

    // Handle button click to open modal
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isButton()) return;

      if (interaction.customId === 'showModal') {
        const modal = new ModalBuilder()
          .setCustomId('taskModal')
          .setTitle('Add Task Details');

        const taskType = new TextInputBuilder()
          .setCustomId('taskType')
          .setLabel('Task Type')
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const taskPriority = new TextInputBuilder()
          .setCustomId('taskPriority')
          .setLabel('Priority')
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const taskTimeRequired = new TextInputBuilder()
          .setCustomId('taskTimeRequired')
          .setLabel('Time Required')
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const taskTimeAllocation = new TextInputBuilder()
          .setCustomId('taskTimeAllocation')
          .setLabel('Time Allocation')
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        const taskDeadline = new TextInputBuilder()
          .setCustomId('taskDeadline')
          .setLabel('Deadline (optional)')
          .setStyle(TextInputStyle.Short)
          .setRequired(false);

        modal.addComponents(
          new ActionRowBuilder().addComponents(taskType),
          new ActionRowBuilder().addComponents(taskPriority),
          new ActionRowBuilder().addComponents(taskTimeRequired),
          new ActionRowBuilder().addComponents(taskTimeAllocation),
          new ActionRowBuilder().addComponents(taskDeadline)
        );

        await interaction.showModal(modal);
      }

      if (interaction.type === InteractionType.ModalSubmit && interaction.customId === 'taskModal') {

        const taskDetails = [
          taskContent,
          interaction.fields.getTextInputValue('taskType') || 'default_type',
          interaction.fields.getTextInputValue('taskPriority') || 'default_priority',
          interaction.fields.getTextInputValue('taskTimeRequired') || 'default_time_required',
          interaction.fields.getTextInputValue('taskTimeAllocation') || 'default_deadline_required',
          taskDeadline = interaction.fields.getTextInputValue('taskDeadline') || 'default_deadline',
          "FALSE", // Completion status
          "default_location",
          "default_notification"
        ];

        await addTaskToSheet(taskDetails);

        await interaction.reply({ content: `Task added: ${taskContent}`, ephemeral: true });
      }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

// /////// need to learn about cogs
