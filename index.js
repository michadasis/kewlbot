const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const run = require('./src/utils/tools/run');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("clientReady", async () => {
  console.log(`KEWL BOT    | ONLINE  GUILD COUNT: ${client.guilds.cache.size}`);
  await run(client);
  client.user.setStatus('idle');

  const statuses = [
    `In ${client.guilds.cache.size} guilds!`,
    `KewlBot | /help`,
    `with you! | /help`,
    `Over ${client.users.cache.size} users!`,
  ];

  setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: ActivityType.Playing });
  }, 60000);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.run(client, interaction);
  } catch (error) {
    console.error(error);
    const msg = { content: "There was an error running this command.", ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(msg);
    } else {
      await interaction.reply(msg);
    }
  }
});

client.login(process.env.token);
