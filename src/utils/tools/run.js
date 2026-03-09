const commands = require('./resources/commands');
const events = require('./resources/events');
const server = require('./resources/server');
const ascii = require('ascii-table');

module.exports = async (client) => {
  let table = new ascii("Client");
  table.setHeading('Load status');
  table.addRow('✅');
  console.log(table.toString());

  await commands(client);
  events(client);
  server();
};
