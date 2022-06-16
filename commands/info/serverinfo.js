const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: ["info"],
    execute(message,args) {
        var server = message.guild;
        var embed = new MessageEmbed()
            .setTitle(server.name)
            .setDescription("ℹ️ **|** All information on this server")
            .setThumbnail(server.iconURL())
            .addField("🆔 | ID SERVER", server.id, true)
            .addField("👥 | MEMBRI", server.memberCount.toString(), false)
            .addField("🎲 | CANALI", server.channels.cache.size.toString(), false)
            .addField("⚙️ | SERVER CREATO", server.createdAt.toDateString(), true)
            .addField("🆙 | BOOST LEVEL", "Level " + (server.premiumTier != "NONE" ? server.premiumTier : 0) + " (Boost: " + server.premiumSubscriptionCount + ")", true)
            .setColor("BLUE")
        message.channel.send({ embeds: [embed] })
      }

}
