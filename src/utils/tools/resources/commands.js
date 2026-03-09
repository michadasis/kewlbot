const { Collection, REST, Routes } = require("discord.js");
const fs = require("fs");
const ascii = require("ascii-table");
require('dotenv').config();

module.exports = async (client) => {
  let table = new ascii("Commands");
  table.setHeading("Command", "Load status");

  client.commands = new Collection();
  const slashCommands = [];

  const dirs = fs.readdirSync(`./src/commands/`).filter(d =>
    fs.statSync(`./src/commands/${d}`).isDirectory()
  );

  for (const dir of dirs) {
    const files = fs.readdirSync(`./src/commands/${dir}`).filter(f => f.endsWith('.js'));
    for (const file of files) {
      try {
        const command = require(`../../../commands/${dir}/${file}`);
        if (!command.data || !command.data.name) {
          console.warn(`⚠️  Skipping ${file} — missing 'data' property (old prefix command?)`);
          table.addRow(file, "⚠️ skipped");
          continue;
        }
        client.commands.set(command.data.name, command);
        slashCommands.push(command.data.toJSON());
        table.addRow(file, "✅");
      } catch (err) {
        console.error(`❌ Failed to load ${file}:`, err.message);
        table.addRow(file, "❌ error");
      }
    }
  }

  console.log(table.toString());

  // Register slash commands globally
  const rest = new REST({ version: '10' }).setToken(process.env.token);
  try {
    console.log(`KEWL BOT    | Registering ${slashCommands.length} slash commands...`);
    await rest.put(
      Routes.applicationCommands(process.env.clientId),
      { body: slashCommands }
    );
    console.log(`KEWL BOT    | Slash commands registered!`);
  } catch (error) {
    console.error("KEWL BOT    | Failed to register slash commands:", error);
  }
};
