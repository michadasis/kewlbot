const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dab')
    .setDescription('Dab on them!'),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.tag} **dabs**`)
      .setImage('https://cdn.discordapp.com/attachments/615247304554709011/620324846517223434/tenor_1.gif')
      .setColor('Random');
    await interaction.reply({ embeds: [embed] });
  }
};
