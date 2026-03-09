const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Info about KewlBot'),

  async run(client, interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Kewl Bot Info')
      .addFields(
        { name: 'About', value: 'Kewl Bot is a fun discord bot to help you express feelings with animated gif commands!' },
        { name: 'Moderation', value: 'Full moderation suite — ban, kick, mute, warn, and more.' },
        { name: 'Suggestions', value: 'Use /suggest to submit ideas!' }
      )
      .setDescription('[Invite Me](https://discordapp.com/oauth2/authorize?client_id=596554872564744232&scope=bot&permissions=470101062)\n[Vote on Top.gg](https://top.gg/bot/596554872564744232/vote)\n[Support Server](https://discord.gg/RvYXByR94G)')
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('Random')
      .setFooter({ text: 'Kewl Bot Created By Michh#9683' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};
