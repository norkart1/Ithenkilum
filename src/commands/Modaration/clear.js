const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete a specific number of messages from a channel.')
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to delete.').setRequired(true)),

  async execute(interaction, client) {
    const amount = interaction.options.getInteger('amount');
    const channel = interaction.channel;

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Manage_Messages)) {
      return await interaction.reply({ content: "You don't have permission to access this command", ephemeral: true });
    }

    if (!amount) {
      return await interaction.reply({ content: "Please specify the amount of messages you want to delete", ephemeral: true });
    }

    if (amount > 100 || amount < 1) {
      return await interaction.reply({ content: "Please select a number between 1 and 100", ephemeral: true });
    }

    await interaction.channel.bulkDelete(amount).catch(err => {
      console.error(err);
      return;
    });

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(`✅ Deleted **${amount}** messages.`);

    await interaction.reply({ embeds: [embed] });
  }
};
