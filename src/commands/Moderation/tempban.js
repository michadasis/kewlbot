const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempban')
    .setDescription('Temporarily ban a member')
    .addUserOption(opt => opt.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(opt => opt.setName('duration').setDescription('Duration e.g. 1h, 30m, 1d').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async run(client, interaction) {
    const target = interaction.options.getMember('user');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason given.';
    const time = ms(duration);

    if (!target) return interaction.reply({ content: "User not found.", ephemeral: true });
    if (!time) return interaction.reply({ content: "Invalid duration. Use formats like `1h`, `30m`, `1d`.", ephemeral: true });

    await interaction.guild.members.ban(target, { reason });
    await interaction.reply(`🔨 **${target.user.tag}** has been temp-banned for **${ms(time, { long: true })}**. Reason: ${reason}`);

    setTimeout(async () => {
      await interaction.guild.members.unban(target.id).catch(() => {});
      await interaction.channel.send(`✅ **${target.user.tag}**'s temp-ban has expired and they have been unbanned.`).catch(() => {});
    }, time);
  }
};
