const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Get a user's avatar")
    .addUserOption(opt => opt.setName('user').setDescription('User to get avatar of (defaults to you)')),

  async run(client, interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`${target.username}'s avatar`)
      .setImage(target.displayAvatarURL({ size: 512, dynamic: true }))
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
