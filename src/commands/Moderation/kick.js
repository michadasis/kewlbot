const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('User to kick').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async run(client, interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason given by the moderator.';

    if (!target) return interaction.reply({ content: "User not found in this server.", ephemeral: true });
    if (!interaction.guild.members.me.permissions.has("KickMembers")) {
      return interaction.reply({ content: "I don't have permission to kick members.", ephemeral: true });
    }

    await target.send(`You have been kicked from **${interaction.guild.name}** for: ${reason}.`).catch(() => {});
    await target.kick(reason);

    const embed = new EmbedBuilder()
      .setTitle('👢 Member Kicked')
      .setDescription(`${target} was successfully kicked.`)
      .addFields(
        { name: 'Moderator', value: `${interaction.user}`, inline: true },
        { name: 'Member', value: `${target}`, inline: true },
        { name: 'Reason', value: reason },
      )
      .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor(0xFF6600);
    await interaction.reply({ embeds: [embed] });
  }
};
