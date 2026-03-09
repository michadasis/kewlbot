const { SlashCommandBuilder } = require('discord.js');

const specialIds = ["713176258862907485", "816358516590903316", "728638037658959922"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gay')
    .setDescription('How gay are you?')
    .addUserOption(opt => opt.setName('user').setDescription('User to check (defaults to you)')),

  async run(client, interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    if (specialIds.includes(target.id)) {
      return interaction.reply(`${target.username} is 100% gay ~~WOW SO GAY🏳️‍🌈~~`);
    }
    const percent = Math.floor(Math.random() * 100) + 1;
    const suffix = percent === 69 ? ' **LEGENDARY**' : percent === 100 ? ' ~~WOW SO GAY🏳️‍🌈~~' : '';
    await interaction.reply(`${target.username} is ${percent}% gay${suffix}`);
  }
};
