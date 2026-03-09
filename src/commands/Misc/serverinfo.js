const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get info about this server'),

  async run(client, interaction) {
    const guild = interaction.guild;
    const owner = await guild.fetchOwner();
    const embed = new EmbedBuilder()
      .setTitle('**Server Information**')
      .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL() })
      .addFields(
        { name: '📛 Name', value: guild.name, inline: true },
        { name: '👑 Owner', value: `${owner}`, inline: true },
        { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
        { name: '🆔 Server ID', value: guild.id, inline: true },
        { name: '🔒 Verification', value: `${guild.verificationLevel}`, inline: true },
        { name: '💤 AFK Channel', value: guild.afkChannel ? `${guild.afkChannel}` : 'None', inline: true },
        { name: '📢 System Channel', value: guild.systemChannel ? `${guild.systemChannel}` : 'None', inline: true },
        { name: '📆 You Joined', value: `<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:F>`, inline: true },
      )
      .setFooter({ text: 'Kewl Bot | Created by Michh#9683', iconURL: client.user.displayAvatarURL() })
      .setTimestamp()
      .setColor(0x3368FF)
      .setThumbnail(guild.iconURL());
    await interaction.reply({ embeds: [embed] });
  }
};
