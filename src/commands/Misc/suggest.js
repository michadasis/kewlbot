const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const GUILD_ID = '839447938731212810';
const SUGGESTIONS_CHANNEL_ID = '850851652482498590';
const SUGGESTIONS_ROLE = '839908407372152852';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Submit a suggestion')
    .addStringOption(opt => opt.setName('suggestion').setDescription('Your suggestion').setRequired(true)),

  async run(client, interaction) {
    const suggestion = interaction.options.getString('suggestion');
    const g = client.guilds.cache.get(GUILD_ID);
    const c = g?.channels.cache.get(SUGGESTIONS_CHANNEL_ID);
    if (!c) return interaction.reply({ content: "Suggestions channel not found.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setDescription(`**Suggestion:** ${suggestion}`)
      .setColor(0x000000)
      .setTimestamp()
      .setFooter({ text: `Submitted by ${interaction.user.tag}` })
      .addFields({ name: "Status", value: "Pending" });

    await c.send(`<@&${SUGGESTIONS_ROLE}>`);
    await c.send({ embeds: [embed] });
    await interaction.reply({ content: '✅ Your suggestion has been submitted!', ephemeral: true });
  }
};
