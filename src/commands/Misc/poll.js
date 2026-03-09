const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll')
    .addStringOption(opt => opt.setName('question').setDescription('The poll question').setRequired(true)),

  async run(client, interaction) {
    const question = interaction.options.getString('question');
    const embed = new EmbedBuilder()
      .setTitle('📊 Poll')
      .setDescription(question)
      .setColor('Random')
      .setFooter({ text: `Poll by ${interaction.user.tag}` })
      .setTimestamp();
    const msg = await interaction.reply({ embeds: [embed], fetchReply: true });
    await msg.react('✅');
    await msg.react('❌');
  }
};
