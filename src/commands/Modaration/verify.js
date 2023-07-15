const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Permissions, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, Roles } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription('Verify command'),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Adminstrator))
      return await interaction.reply({
        content: "You must be an admin to create a verification message",
        ephemeral: true,
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('verify_button')
        .setEmoji('✅')
        .setLabel('Verify')
        .setStyle(ButtonStyle.Primary)
    );

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('Server Verification')
      .setDescription('Click the button below to verify yourself within the server');

    await interaction.reply({ embeds: [embed], components: [button] });

    const collector = interaction.channel.createMessageComponentCollector();
    collector.on('collect', async (i) => {
      await i.update({ embeds: [embed], components: [button] });

      const role = i.guild.roles.cache.find((r) => r.name === 'Verified');

      const member = i.member;

      member.roles.add('1128974322204160022');

      i.user.send(`You are now verified within **${i.guild.name}**`)
        .catch((err) => {
          return;
        });
    });
  },
};
