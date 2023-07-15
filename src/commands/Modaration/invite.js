const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Invite a user to the server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to invite')
        .setRequired(true)),
  
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    let invites = await interaction.guild.invites.fetch();
    let userInvites = invites.filter(invite => invite.inviter && invite.inviter.id === user.id);

    let count = 0;
    userInvites.forEach(invite => (count += invite.uses));

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setDescription(`:white_check_mark: ${user.tag} has **${count}** invites.`);

    await interaction.reply({ embeds: [embed] });
  },
};
