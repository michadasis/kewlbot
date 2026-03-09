const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Evaluate code (owner only)')
    .addStringOption(opt => opt.setName('code').setDescription('Code to evaluate').setRequired(true)),

  async run(client, interaction) {
    if (interaction.user.id !== "494105564335308811") {
      return interaction.reply({ content: "You are not the owner of this bot.", ephemeral: true });
    }

    const clean = text => typeof text === "string"
      ? text.replace(/`/g, "`\u200B").replace(/@/g, "@\u200B")
      : text;

    try {
      const code = interaction.options.getString('code');
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      await interaction.reply({ content: `\`\`\`js\n${clean(evaled)}\n\`\`\``, ephemeral: true });
    } catch (err) {
      await interaction.reply({ content: `\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``, ephemeral: true });
    }
  }
};
