const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Unmute a member')
    .addUserOption(opt => opt.setName('user').setDescription('User to unmute').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async run(client, interaction) {
    const target = interaction.options.getMember('user');
    if (!target) return interaction.reply({ content: "User not found.", ephemeral: true });

    const role = interaction.guild.roles.cache.find(r => r.name === "Muted");
    if (!role) return interaction.reply({ content: "Couldn't find a role named **Muted**.", ephemeral: true });

    await target.roles.remove(role).catch(err => console.log(err));
    await interaction.reply(`🔊 **${target.user.tag}** has been unmuted.`);
  }
};
