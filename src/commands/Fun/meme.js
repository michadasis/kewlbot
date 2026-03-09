const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Get a random meme from Reddit'),

  async run(client, interaction) {
    await interaction.deferReply();
    const subReddits = ["dankmemes", "meme", "me_irl", "wholesomememes", "comedyheaven"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    try {
      const res = await fetch(`https://www.reddit.com/r/${random}/random.json?limit=1`);
      const data = await res.json();
      const post = data[0]?.data?.children[0]?.data;
      if (!post?.url) return interaction.editReply("Couldn't fetch a meme right now, try again!");

      const embed = new EmbedBuilder()
        .setColor('Random')
        .setImage(post.url)
        .setTitle(`From r/${random}`)
        .setURL(`https://reddit.com/r/${random}`);
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply("Couldn't fetch a meme right now, try again!");
    }
  }
};
