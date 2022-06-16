module.exports={
    name: 'clear',
    aliases: ["c"],
    data:{
        name: 'clear',
        description: 'Delete Messages',
        permission: 'MANAGE_MESSAGES',
    },
    async execute(message, args){
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send('\:x: » `You cannot execute this command`')
        }
        if(!message.guild.me.permissions.has('MANAGE_MESSAGES')){
            return message.channel.send('You Don\' Have permission :(')
        }
        var count = parseInt(message.content.split(/\s+/)[1]);
        if(!count){
            return message.channel.send('\:question: » `Specifies The Number Of Messages To Delete`');
        };
        if(count>100){
            return message.channel.send('\:x: » `You cannot delete more than [100] messages at a time`')
        };
        message.channel.bulkDelete(count,true)
        message.channel.send({content: `${count} messages deleted`, ephemeral: true})
        
    }
}
