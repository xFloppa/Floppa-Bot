const discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "warn",
    Staff: true,
    execute(message, client) {
        var user = message.mentions.members?.first()
        var messagee = message.content.slice(28).trim();
        let channelMod = message.guild.channels.cache.get(config.moderationAlertChannel);

        if (!user) {
            message.delete()
            message.channel.send("I need to enter a user!")
            return;
        }

        if (user.id === message.author.id) {
            message.delete()
            message.channel.send("You cannot warn yourself!")
            return;
        }

        if (!messagee) {
            message.delete()
            message.channel.send("You must enter the reason for the warn!")
            return;
        }

        const successfully = new discord.MessageEmbed()
            .setColor("RED")
            .setAuthor("WARN", client.user.displayAvatarURL())
            .addField("Author:", `<@${message.author.id}>`)
            .addField("User:", `<@${user.id}>`)
            .addField("Reason:", `${messagee}`)
            .setFooter({
                text: "Floppa-Bot",
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp()
        const warn = new discord.MessageEmbed()
            .setColor("RED")
            .setTitle("❌ Warn")
            .addField("Author:", `<@${message.author.id}>`)
            .addField("Reason:", `${messagee}`)
            .setFooter({
                text: "Floppa-Bot",
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp()
        message.delete()
        channelMod.send({
            embeds: [successfully]
        })

        user.send({
            embeds: [warn]
        })



    }
}
