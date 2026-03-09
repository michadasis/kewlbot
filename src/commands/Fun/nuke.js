const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Nuke (clone and delete) the current channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async run(client, interaction) {
    if (!interaction.guild.members.me.permissions.has("ManageChannels")) {
      return interaction.reply({ content: "I need the MANAGE_CHANNELS permission to do this.", ephemeral: true });
    }

    await interaction.reply({ content: '💣 Nuking...', ephemeral: true });
    const channel = interaction.channel;
    const clone = await channel.clone();
    await clone.setParent(channel.parentId);
    await clone.setPosition(channel.position);
    await clone.send('https://media.giphy.com/media/oe33xf3B50fsc/giphy.gif');
    await channel.delete();
  }
};
