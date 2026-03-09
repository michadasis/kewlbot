const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user by their ID')
    .addStringOption(opt => opt.setName('userid').setDescription('The ID of the user to unban').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for unban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async run(client, interaction) {
    const id = interaction.options.getString('userid').replace(/[<@!>]/g, '');
    const reason = interaction.options.getString('reason') || 'No reason given.';

    if (isNaN(id)) return interaction.reply({ content: "Please provide a valid user ID.", ephemeral: true });

    const bans = await interaction.guild.bans.fetch();
    const bannedUser = bans.get(id);
    if (!bannedUser) return interaction.reply({ content: "That user is not banned.", ephemeral: true });

    await interaction.guild.members.unban(id, reason);

    const embed = new EmbedBuilder()
      .setTitle('✅ Member Unbanned')
      .setDescription(`**${bannedUser.user.tag}** was successfully unbanned.`)
      .addFields(
        { name: 'Moderator', value: `${interaction.user}`, inline: true },
        { name: 'Reason', value: reason },
      )
      .setTimestamp()
      .setColor(0x00FF00);
    await interaction.reply({ embeds: [embed] });
  }
};
