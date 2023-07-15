const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('This is the Test command!'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Test Command')
      .setDescription('This is a test command.')
      

    await interaction.reply({ embeds: [embed] });
  },
};