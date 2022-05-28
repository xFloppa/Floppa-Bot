const { Client, Intents, Collection, Interaction } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const { MessageEmbed, Channel } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const { readdirSync } = require('fs');

const config = require("./config.json");

client.login("TOKEN");

client.on("ready", () => {
    client.user.setActivity("YOUR ACTIVITY")

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
    const prefix = "your prefix";

    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if (comando.onlyStaff) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You Don't Have Permission)
            return
        }
    }

    comando.execute(message, client, args);
})

// SYSTEM VERIFY

client.on('messageCreate', (message) => {

    const embedverify = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('VERIFY')
        .addField('How can I verify myself? ', ' To verify you just click on the button below, for any problem open a ticket!')
        .setFooter('your footer', 'your link images or logo)

    const buttonverify = new MessageActionRow()

        .setComponents(
             new MessageButton()
                .setCustomId('left arrow')
                .setLabel('»')
                .setStyle('SUCCESS')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('verify')
                .setLabel('✅')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('right arrow')
                .setLabel('«')
                .setStyle('SUCCESS')
                .setDisabled(true),
        )
    
        

    if (message.content == config.prefix + "your text - command to bring up the embed of the verification") {
        message.delete()
        message.channel.send({ embeds: [embedverify], components: [buttonverify]})
    }
})

client.on('interactionCreate', (interaction) => {

    if (interaction.customId == 'verify') {
        interaction.reply({
            content: 'You have been successfully verified!',
            ephemeral: true
        })
        interaction.member.roles.add('role member')
    }
})

// EVENT WELCOME

client.on("guildMemberAdd", member => {
    var embed = new MessageEmbed()
        .setTitle("WELCOME")
        .setDescription(`Hello ${member.toString()}, welcome in ${member.guild.name}. you are the **${member.guild.memberCount}° member**`)
    
        client.channels.cache.get("id room tho send this embed").send({embeds: [embed]});
})
