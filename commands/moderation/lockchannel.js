const ds = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config  = require("../../config.json");

module.exports = {
    name: "lock",
    permission: "BAN_MEMBERS",
    async execute(interaction) {
        const role = config.utente;
        const staff = config.staff;

        const BlockChannel = new MessageEmbed()
            .setColor('RED')
            .setTitle('CHAT LOCK')
            .setDescription('Se desideri bloccare la chat clicca sul pulsante qui sotto per bloccarla!')
            .setFooter({
                text: 'Your Footer'
            })

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('lock')
                    .setLabel('Lock Channel')
                    .setStyle('DANGER')
            )
            .addComponents(
                new MessageButton()
                .setCustomId('unlock')
                .setLabel("Unlock Channel")
                .setStyle("SUCCESS")
                .setDisabled()
            )

        interaction.reply({
            embeds: [BlockChannel],
            components: [row],
            ephemeral: true
        })
        const collector = interaction.channel.createMessageComponentCollector({ time: 10000})

        collector.on('collect', async i => {
            if (i.customId === "lock") {
            interaction.channel.edit({
                permissionOverwrites: [
                  {
                    id: config.staff,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                  },
                  {
                    id: config.member,
                    deny: ['SEND_MESSAGES'],
                  },
                ],
            })
            await i.update({ content: "You have successfully blocked the channel!", embeds: [], components: []})
        }
        })
    }
}
