const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View all available commands'),

  async run(client, interaction) {
    const commandsPath = path.join(__dirname, '../../commands');
    const categories = fs.readdirSync(commandsPath);

    const embed = new EmbedBuilder()
      .setTitle('📖 KewlBot Commands')
      .setColor(0x33FF83)
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({ text: 'Kewl Bot | Created by Michh#9683', iconURL: client.user.displayAvatarURL() })
      .setTimestamp();

    for (const category of categories) {
      const categoryPath = path.join(commandsPath, category);
      if (!fs.statSync(categoryPath).isDirectory()) continue;

      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
      const commandList = files
        .map(file => {
          try {
            const cmd = require(path.join(categoryPath, file));
            if (!cmd.data?.name) return null; // skip old prefix commands
            return `\`/${cmd.data.name}\` — ${cmd.data.description}`;
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (commandList.length > 0) {
        const categoryEmoji = { Fun: '🎉', Misc: '🔧', Moderation: '🔨' };
        embed.addFields({
          name: `${categoryEmoji[category] || '📁'} ${category}`,
          value: commandList.join('\n'),
        });
      }
    }

    await interaction.reply({ embeds: [embed] });
  }
};