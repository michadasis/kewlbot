const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempmute')
    .setDescription('Temporarily mute a member')
    .addUserOption(opt => opt.setName('user').setDescription('User to mute').setRequired(true))
    .addStringOption(opt => opt.setName('duration').setDescription('Duration e.g. 1h, 30m, 1d').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for mute'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async run(client, interaction) {
    const target = interaction.options.getMember('user');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason given.';
    const time = ms(duration);

    if (!target) return interaction.reply({ content: "User not found.", ephemeral: true });
    if (!time) return interaction.reply({ content: "Invalid duration. Use formats like `1h`, `30m`, `1d`.", ephemeral: true });

    const role = interaction.guild.roles.cache.find(r => r.name === "Muted");
    if (!role) return interaction.reply({ content: "Couldn't find a role named **Muted**.", ephemeral: true });

    await target.roles.add(role, reason);
    await interaction.reply(`🔇 **${target.user.tag}** has been temp-muted for **${ms(time, { long: true })}**. Reason: ${reason}`);

    setTimeout(async () => {
      await target.roles.remove(role).catch(() => {});
      await interaction.channel.send(`🔊 **${target.user.tag}**'s temp-mute has expired.`).catch(() => {});
    }, time);
  }
};
