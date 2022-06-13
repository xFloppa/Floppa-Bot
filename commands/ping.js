const { message } = require("discord.js")

module.exports= {
    name: 'ping',
    execute(message, client) {

        message.reply('⚙️ I\'m pinging the Bot...').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            message.reply(`🤖 **Bot Ping ⇒** _${ping}_`)
        })
}}
