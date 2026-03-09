const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a member')
    .addUserOption(opt => opt.setName('user').setDescription('User to mute').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for mute'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async run(client, interaction) {
    const target = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason') || 'No reason given.';
    if (!target) return interaction.reply({ content: "User not found.", ephemeral: true });

    const role = interaction.guild.roles.cache.find(r => r.name === "Muted");
    if (!role) return interaction.reply({ content: "Couldn't find a role named **Muted**. Please create one.", ephemeral: true });

    await target.roles.add(role, reason).catch(err => console.log(err));
    await interaction.reply(`🔇 **${target.user.tag}** has been muted. Reason: ${reason}`);
  }
};
