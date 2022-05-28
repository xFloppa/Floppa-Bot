const { Client, Intents, Collection, Interaction } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const { MessageEmbed, Channel } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { readdirSync } = require('fs');

const config = require("./config.json");

client.login("OTY1NTQwNDM0NzI0MTMwODY2.Yl0rmg.y-M5oMZs_v0mz6NadpyCczX9YU0");

client.on("ready", () => {
    client.user.setActivity("play.squidmc.it")

})


const fs = require("fs");
const internal = require('stream');

client.commands = new Collection();

const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

const eventsFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args))
}

client.on("message", message => {
    const prefix = "!";

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if (comando.onlyStaff) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Non hai il permesso di eseguire questo comando")
            return
        }
    }

    comando.execute(message, client, args);
})

// COMANDI VERIFICAAA

client.on('messageCreate', (message) => {

    const benitopippo = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('VERIFICA')
        .addField('Come posso verificarmi?', 'Per verificarti basta che clicchi sul pulsante qui sotto, per qualsiasi problema apri un ticket!')
        .setFooter('SquidMC Management', 'https://i.imgur.com/uFQcJeJ.png')

    const vivalafiga = new MessageActionRow()

        .setComponents(
             new MessageButton()
                .setCustomId('freccia sin')
                .setLabel('»')
                .setStyle('SUCCESS')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('verifica')
                .setLabel('✅')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('freccia des')
                .setLabel('«')
                .setStyle('SUCCESS')
                .setDisabled(true),
        )
    
        

    if (message.content == config.prefix + "setupverificaforzafloppa") {
        message.delete()
        message.channel.send({ embeds: [benitopippo], components: [vivalafiga]})
    }
})

client.on('interactionCreate', (interaction) => {

    if (interaction.customId == 'verifica') {
        interaction.reply({
            content: '**___Sei stato verificato correttamente! \:trident: ___**',
            ephemeral: true
        })
        interaction.member.roles.add('967169917277331517')
    }
})

// EVENTO BENVENUTO

client.on("guildMemberAdd", member => {
    var embed = new MessageEmbed()
        .setTitle("WELCOME")
        .setDescription(`Ciao ${member.toString()}, benvenuto in ${member.guild.name}. Sei il **${member.guild.memberCount}° Membro**`)
    
        client.channels.cache.get("967421571855708180").send({embeds: [embed]});
})


// COMANDI PEX E DEPEX FORZA FLOPPA
// COMING SOON