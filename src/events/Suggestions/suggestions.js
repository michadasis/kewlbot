const SUGGESTIONS_CHANNEL_ID = '850851652482498590';

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.channel.id === SUGGESTIONS_CHANNEL_ID && !message.author.bot) {
      await message.react('✅');
      await message.react('❎');
    }
  });
};
