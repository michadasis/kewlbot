const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Bulk delete messages (1-100)')
    .addIntegerOption(opt => opt.setName('amount').setDescription('Number of messages to delete').setRequired(true).setMinValue(1).setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async run(client, interaction) {
    const amount = interaction.options.getInteger('amount');
    await interaction.channel.bulkDelete(amount, true).catch(err => console.log(err));
    await interaction.reply({ content: `✅ Deleted **${amount}** messages.`, ephemeral: true });
  }
};
