const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fac')
    .setDescription('Forever alone...'),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} **is forever alone**`)
      .setImage('https://cdn.discordapp.com/attachments/600743763979272204/619931515941552167/tumblr_mi068vORON1s0tauko1_400.gif')
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
