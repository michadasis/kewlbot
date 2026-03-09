const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Check ship compatibility between two users')
    .addUserOption(opt => opt.setName('user1').setDescription('First user').setRequired(true))
    .addUserOption(opt => opt.setName('user2').setDescription('Second user').setRequired(true)),

  async run(client, interaction) {
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');
    const percent = Math.floor(Math.random() * 100) + 1;
    const suffix = percent === 69 ? ' **LEGENDARY**' : percent === 100 ? ' ~~WOW SO LOVELY~~' : '';
    await interaction.reply(`💕 ${user1.username} + ${user2.username} = ${percent}% ship${suffix}`);
  }
};
