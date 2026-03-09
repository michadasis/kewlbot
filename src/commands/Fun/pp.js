const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pp')
    .setDescription('Check pp size')
    .addUserOption(opt => opt.setName('user').setDescription('User to check (defaults to you)')),

  async run(client, interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const sizes = ["8D","8=D","8==D","8===D","8====D","8=====D","8======D","8=======D","8========D","8=========D","8==========D","8===========D","8============D","8=============D","8==============D","8===============D","8================D"];
    const pp = sizes[Math.floor(Math.random() * sizes.length)];
    const embed = new EmbedBuilder()
      .setTitle('peepee size machine')
      .setDescription(`${target}'s penis ${pp}`);
    await interaction.reply({ embeds: [embed] });
  }
};
