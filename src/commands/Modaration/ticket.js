
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ButtonInteraction, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Use this command to create a ticket message'),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Adminstrator)) {
      return await interaction.reply({ content: 'You must be an administrator to create a ticket message' });
    }


    const button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('button')
          .setEmoji('✉️')
          .setLabel('create ticket')
          .setStyle(ButtonStyle.Secondary),
      )

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('Tickets & Supported ')
      .setDescription('Click the button below to talk to staff (create a ticket)')

    await interaction.reply({ embeds: [embed], components: [button] });

    const collecter = await interaction.channel.createMessageComponentCollector();

    collecter.on('collect', async i => {
      await i.update({ embeds: [embed], components: [button] });

      const channel = await interaction.guild.channels.create({
        name: `ticket ${i.user.tag}`,
        type: ChannelType.GuildText,
        parent: '1127443938421248132'
      });

      /*     channel.permissionOverWrites.create(i.user.id, { ViewChannel: true, SendMessage: true });
     
       */
      channel.permissionOverwrites.create(i.user.id, {
        ViewChannel: true,
        SendMessage: true
      });


      channel.permissionOverwrites.create(channel.guild.roles.everyone, {
        ViewChannel: false
      })
    }
                 }

