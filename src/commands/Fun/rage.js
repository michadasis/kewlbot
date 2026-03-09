const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rage')
    .setDescription('RAGE!!!'),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} **rages... alot**`)
      .setImage('https://cdn.discordapp.com/attachments/600743763979272204/619933187388342292/SpeedyWhimsicalKittiwake-size_restricted.gif')
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
