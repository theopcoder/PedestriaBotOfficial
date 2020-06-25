const Commando = require("discord.js-commando");
const discord = require('discord.js');

class UnmuteCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "unmute",
            group: "admin",
            memberName: 'unmute',
            description: 'Unmutes a user.'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let UnmutedUser = message.guild.member(message.mentions.users.first());
        if(!UnmutedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        if (UnmutedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't unmute a staff member! :no_entry_sign:")
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        {
            if (!reason) return message.reply(':warning: Please supply a reason for the unmute!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        /*{
            let role = message.guild.roles.find(r => r.name === "Member");
            let member = message.mentions.members.first();
            member.addRole(role)
        }*/
        {
            let role = message.guild.roles.find(r => r.name === "Muted");
            let member = message.mentions.members.first();
            member.removeRole(role)
        }
        message.reply(message.author.tag+' Has unmuted '+message.mentions.users.first()+ ' For, '+reason);

        const unmutemsg = new discord.RichEmbed()
        .setColor("0xFF0000")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', 'Unmute') 
        .addField('Moderator:', 
        `${message.author.tag}`)
        .addField('Unmuted User:', message.mentions.users.first())
        .addField('Reason', reason)
        message.channel.send(`This has been logged!`)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(unmutemsg);
    }
}

module.exports = UnmuteCommand;