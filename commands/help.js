const { MessageEmbed, Channel } = require('discord.js');
// THIS IS A SIMPLY EMBED.
module.exports = {
    name: "help",
    description: "command for each function that the bot",
    execute(message, ergs) {
        const embed1 = new MessageEmbed()
            const embed = new Discord.MessageEmbed()
            .setTitle("Title") //Title
            .setColor("#34a42d") // Color Principal
            .setURL("UrlTitle") //link on the title
            .setAuthor("Author") /*OR*/.setAuthor("Author", "LinkImage") //Autore
            .setDescription("Description") //Description
            .setThumbnail("UrlCover") //Cover
            //Add Element
            .addField("Title", "Content", true) //HERE ALL PARAMETERS ARE MANDATORY - True or false = if this element must be in line with the others
            .setImage("LinkImage") //Image
            .setFooter({text: "Text Footer"}) // Tiny text at the bottom
            .setTimestamp() //Whether or not to put the arrival time of the message
        message.channel.send({embeds: [embed]})
    }

}
