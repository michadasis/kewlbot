const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .addUserOption(opt => opt.setName('user').setDescription('User to warn').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async run(client, interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if (!target) return interaction.reply({ content: "User not found.", ephemeral: true });

    await target.send(`⚠️ You have been warned in **${interaction.guild.name}** for: ${reason}`).catch(() => {});
    await interaction.reply(`⚠️ **${target.user.tag}** has been warned for: ${reason}`);
  }
};
