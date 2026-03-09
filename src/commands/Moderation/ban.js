const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async run(client, interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason given by the moderator.';

    if (!target) return interaction.reply({ content: "User not found in this server.", ephemeral: true });
    if (!interaction.guild.members.me.permissions.has("BanMembers")) {
      return interaction.reply({ content: "I don't have permission to ban members.", ephemeral: true });
    }

    await target.send(`You have been banned from **${interaction.guild.name}** for: ${reason}.`).catch(() => {});
    await interaction.guild.members.ban(target, { reason });

    const embed = new EmbedBuilder()
      .setTitle('🔨 Member Banned')
      .setDescription(`${target} was successfully banned.`)
      .addFields(
        { name: 'Moderator', value: `${interaction.user}`, inline: true },
        { name: 'Member', value: `${target}`, inline: true },
        { name: 'Reason', value: reason },
      )
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor(0xFF0000);
    await interaction.reply({ embeds: [embed] });
  }
};
