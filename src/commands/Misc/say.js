const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const blacklisted = ["596554872564744232", "661249728692092928", "222755040643907595", "305742353078157312"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(opt => opt.setName('message').setDescription('What to say').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async run(client, interaction) {
    if (blacklisted.includes(interaction.user.id)) {
      return interaction.reply({ content: "You have been blacklisted from using this command.", ephemeral: true });
    }
    const text = interaction.options.getString('message');
    await interaction.reply({ content: '✅', ephemeral: true });
    await interaction.channel.send(text);
  }
};
