const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get info about a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to look up (defaults to you)')),

  async run(client, interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild.members.cache.get(target.id);
    const embed = new EmbedBuilder()
      .setTitle(target.username)
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '🆔 ID', value: target.id, inline: false },
        { name: '📅 Account Created', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:F>`, inline: false },
        { name: '📆 Joined Server', value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>` : 'Unknown', inline: false },
      )
      .setFooter({ text: 'Kewl Bot | Created by Michh#9683', iconURL: client.user.displayAvatarURL() })
      .setTimestamp()
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
