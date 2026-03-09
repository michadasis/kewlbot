const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uselessweb')
    .setDescription('Get a random useless website'),

  async run(client, interaction) {
    await interaction.reply("https://theuselessweb.com/");
  }
};
