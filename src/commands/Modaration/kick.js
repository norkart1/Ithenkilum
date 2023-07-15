const { SlashCommandBuilder } = require('@discordjs/builders');
const {  PermissionsBitField, Permissions,  EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('User to kick')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('Reason for kicking the user')
        .setRequired(false)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply({
        content: 'You do not have permission to use this command.',
        ephemeral: true,
      });
    }

    if (!member.kickable) {
      return interaction.reply({
        content: 'I cannot kick that user.',
        ephemeral: true,
      });
    }

    try {
      await member.kick(reason);

      const kickEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Member Kicked')
        .setDescription(`Successfully kicked ${member.user.tag}`)
        .addField('Reason', reason)
        .setTimestamp();

      interaction.reply({ embeds: [kickEmbed] });
    } catch (error) {
      console.error(`Error kicking user: ${error}`);
      interaction.reply({
        content: 'An error occurred while kicking the user.',
        ephemeral: true,
      });
    }
  },
};
