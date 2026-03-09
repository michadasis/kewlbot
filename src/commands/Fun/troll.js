const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('troll')
    .setDescription('Troll someone!'),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} **trolls**`)
      .setImage('https://cdn.discordapp.com/attachments/602850365431480331/619930715043397655/giphy_1.gif')
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
