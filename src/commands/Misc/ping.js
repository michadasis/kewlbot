
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "ping",
  description: " ",

  async run(client, message, args) {
    message.channel.send(`Hoold on!`).then(m => {
        m.edit(`**Pong!**\nMessage edit time is ` + (message.createdTimestamp - message.createdTimestamp) + `ms, Discord API heartbeat is ` + Math.round(client.ping) + `ms.`).then(message.react('🏓'))
            
        });

        console.log('KEWL BOT    | PING COMMAND USED IN ' + message.guild.name)
  }
}