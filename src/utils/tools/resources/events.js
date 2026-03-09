const fs = require('fs');
const ascii = require('ascii-table');

module.exports = (client) => {
  let table = new ascii("Events");
  table.setHeading('Event', 'Load status');

  fs.readdirSync(`./src/events/`).forEach((dir) => {
    const files = fs.readdirSync(`./src/events/${dir}`).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const event = require(`../../../events/${dir}/${file}`);
      table.addRow(file, "✅");
      event(client);
    }
  });

  console.log(table.toString());
};
