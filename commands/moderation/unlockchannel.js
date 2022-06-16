const ds = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config  = require("../../config.json");

module.exports = {
    name: "unlock",
    permission: "MOVE_MEMBERS",
    async execute(interaction) {
        const role = config.utente;
        const staff = config.staff;

        const BlockChannel = new MessageEmbed()
            .setColor('RED')
            .setTitle('CHAT LOCK')
            .setDescription('If you want to block the chat click on the button below to block it!')
            .setFooter({
                text: 'Your Footer'
            })

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('lock')
                    .setLabel('Lock')
                    .setStyle('DANGER')
                    .setDisabled()
            )
            .addComponents(
                new MessageButton()
                .setCustomId('unlock')
                .setLabel("Unlock")
                .setStyle("SUCCESS")
            )

        interaction.reply({
            embeds: [BlockChannel],
            components: [row],
            ephemeral: true
        })
        const collector = interaction.channel.createMessageComponentCollector()

        collector.on('collect', async i => {
            if (i.customId === "unlock") {
            interaction.channel.edit({
                permissionOverwrites: [
                  {
                    id: config.staff,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                  },
                  {
                    id: config.member,
                    allow: ['SEND_MESSAGES'],
                  },
                ],
            })
            await i.update({ content: "You have successfully unblocked the channel!", embeds: [], components: []})
        }
        })
        
    }
}
