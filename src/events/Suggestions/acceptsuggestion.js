const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
  client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.emoji.name === '✅') {
      const msg = reaction.message;
      const data = msg.embeds[0];
      if (!data) return;
      const embed = new EmbedBuilder()
        .setDescription(data.description)
        .setColor(0x00FF00)
        .setTimestamp()
        .addFields({ name: "Status", value: "✅ Accepted" });
      await msg.edit({ embeds: [embed] });
      await msg.reactions.removeAll();
    }
  });
};
