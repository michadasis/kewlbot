const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shrug')
    .setDescription('Shrug it off'),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} **shrugs**`)
      .setImage('https://media1.giphy.com/media/3o7TKHKjrDyqphX9Cg/giphy.gif')
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
