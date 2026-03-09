const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dance')
    .setDescription('Dance till death!'),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} **dances till death**`)
      .setImage('https://cdn.discordapp.com/attachments/602850365431480331/619929531251425296/tenor.gif')
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
