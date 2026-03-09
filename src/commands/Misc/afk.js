const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Set yourself as AFK'),

  async run(client, interaction) {
    await interaction.member.setNickname(`[AFK] ${interaction.user.username}`).catch(() => {});
    await interaction.reply(`${interaction.user} is now AFK.`);
  }
};
