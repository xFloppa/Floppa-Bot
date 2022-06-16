const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "your Command",
    description: "Description of the command",
    aliases: ["aliases command"],
    execute(message) {
        message.channel.send("MESSAGE")
    }
}
