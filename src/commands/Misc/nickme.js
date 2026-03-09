const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nickme')
    .setDescription('Change your nickname')
    .addStringOption(opt => opt.setName('nickname').setDescription('Your new nickname').setRequired(true)),

  async run(client, interaction) {
    const nick = interaction.options.getString('nickname');
    await interaction.member.setNickname(nick).catch(() => {});
    await interaction.reply({ content: `Your nickname has been changed to **${nick}**.`, ephemeral: true });
  }
};
