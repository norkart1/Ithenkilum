const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot\'s ping'),
  async execute(interaction) {
    const pingEmbed = new EmbedBuilder()
      .setColor('#E5CE35')
      .setTitle('Ping')
      .setDescription(`Current bot ping: ${Math.round(interaction.client.ws.ping)}ms`);

    interaction.reply({ embeds: [pingEmbed] });
  },
};
