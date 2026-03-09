const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unafk')
    .setDescription('Remove your AFK status'),

  async run(client, interaction) {
    await interaction.member.setNickname(interaction.user.username).catch(() => {});
    await interaction.reply(`${interaction.user} Your [AFK] tag has been removed.`);
  }
};
