const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetnick')
    .setDescription('Reset your nickname to your username'),

  async run(client, interaction) {
    await interaction.member.setNickname(interaction.user.username).catch(() => {});
    await interaction.reply({ content: 'Your nickname has been reset.', ephemeral: true });
  }
};
