const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Displays the member count of the server'),
  async execute(interaction) {
    const guild = interaction.guild;
    const memberCount = guild.memberCount;

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Server Member Count')
      .setDescription(`This server has ${memberCount} members.`);

    interaction.reply({ embeds: [embed] });
  },
};
