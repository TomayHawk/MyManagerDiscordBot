import { StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export const taskTypeDropdown = new StringSelectMenuBuilder()
    .setCustomId('taskType')
    .setPlaceholder('Select Type')
    .addOptions([
        { label: 'Type: Task', value: 'Task' },
        { label: 'Type: Event', value: 'Event' }
    ]);

export const taskPriorityDropdown = new StringSelectMenuBuilder()
    .setCustomId('taskPriority')
    .setPlaceholder('Select Priority')
    .addOptions([
        { label: 'Priority: Low', value: 'Low' },
        { label: 'Priority: Medium', value: 'Medium' },
        { label: 'Priority: High', value: 'High' },
        { label: 'Priority: Urgent', value: 'Urgent' }
    ]);

export const taskCategoryDropdown = new StringSelectMenuBuilder()
    .setCustomId('taskCategory')
    .setPlaceholder('Select Category')
    .addOptions([
        { label: 'Category: Personal', value: 'Personal' },
        { label: 'Category: School', value: 'School' },
        { label: 'Category: DASG', value: 'DASG' },
        { label: 'Category: Clubs', value: 'Clubs' },
        { label: 'Category: Others', value: 'Others' }
    ]);

export const taskDifficultyDropdown = new StringSelectMenuBuilder()
    .setCustomId('taskDifficulty')
    .setPlaceholder('Select Difficulty')
    .addOptions([
        { label: 'Difficulty: Easy', value: 'Easy' },
        { label: 'Difficulty: Medium', value: 'Medium' },
        { label: 'Difficulty: Hard', value: 'Hard' },
        { label: 'Difficulty: Annoying', value: 'Annoying' }
    ]);

export const taskTimeRequiredDropdown = new StringSelectMenuBuilder()
    .setCustomId('taskTimeRequired')
    .setPlaceholder('Select Time Required')
    .addOptions([
        { label: 'Time Required: 15 minutes', value: '15 minutes' },
        { label: 'Time Required: 30 minutes', value: '30 minutes' },
        { label: 'Time Required: 1 hour', value: '1 hour' },
        { label: 'Time Required: 1.5 hours', value: '1.5 hours' },
        { label: 'Time Required: 2 hours', value: '2 hours' },
        { label: 'Time Required: 2.5 hours', value: '2.5 hours' },
        { label: 'Time Required: 3+ hours', value: '3+ hours' }
    ]);

export const taskNotification1Dropdown = new StringSelectMenuBuilder()
    .setCustomId('taskNotification1')
    .setPlaceholder('Select First Notification')
    .addOptions([
        { label: 'Notification: No Notification', value: '-' },
        { label: 'Notification: 5 minutes', value: '5 minutes' },
        { label: 'Notification: 10 minutes', value: '10 minutes' },
        { label: 'Notification: 15 minutes', value: '15 minutes' },
        { label: 'Notification: 30 minutes', value: '30 minutes' },
        { label: 'Notification: 1 hour', value: '1 hour' },
        { label: 'Notification: 2 hours', value: '2 hours' }
    ]);

export const taskNotification2Dropdown = new StringSelectMenuBuilder()
    .setCustomId('taskNotification2')
    .setPlaceholder('Select Second Notification')
    .addOptions([
        { label: 'Notification: No Notification', value: '-' },
        { label: 'Notification: 5 minutes', value: '5 minutes' },
        { label: 'Notification: 10 minutes', value: '10 minutes' },
        { label: 'Notification: 15 minutes', value: '15 minutes' },
        { label: 'Notification: 30 minutes', value: '30 minutes' },
        { label: 'Notification: 1 hour', value: '1 hour' },
        { label: 'Notification: 2 hours', value: '2 hours' }
    ]);

export const moreDetailsButton = new ButtonBuilder()
    .setCustomId('moreDetails')
    .setLabel('More Details')
    .setStyle(ButtonStyle.Primary);

export const submitTaskButton = new ButtonBuilder()
    .setCustomId('submitTask')
    .setLabel('Submit Task')
    .setStyle(ButtonStyle.Primary);

export const taskTimeAllocation = new TextInputBuilder()
    .setCustomId('taskTimeAllocation')
    .setLabel('Time Allocation (DD/MM/YYYY XX:XX)')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

export const taskDeadline = new TextInputBuilder()
    .setCustomId('taskDeadline')
    .setLabel('Deadline (DD/MM/YYYY XX:XX)')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

export const taskLocation = new TextInputBuilder()
    .setCustomId('taskLocation')
    .setLabel('Location (Paste Google Location)')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

export const taskNotes = new TextInputBuilder()
    .setCustomId('taskNotes')
    .setLabel('Add Notes')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);
