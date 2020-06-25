const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

class MuteCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "mute",
            group: "admin",
            memberName: 'mute',
            description: 'Mutes a player.'
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
        let MutedUser = message.guild.member(message.mentions.users.first());
        if(!MutedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        if (MutedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't mute a staff member! :no_entry_sign:")
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        {
            if (!reason) return message.reply(':warning: Please supply a reason for the mute!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        {
            let role = message.guild.roles.find(r => r.name === "Muted");
            let member = message.mentions.members.first();
            member.addRole(role)
        }
        /*{
            let role = message.guild.roles.find(r => r.name === "Member");
            let member = message.mentions.members.first();
            member.removeRole(role)
        }*/
        message.reply('Has muted '+message.mentions.users.first()+ ' For, '+reason);
        
        db.add(`{mutep}_${message.mentions.members.first().id}`, 1);
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);

        const mutemsg = new discord.RichEmbed()
        .setColor("0xFF0000")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL)
        .addField('Action:', 'Mute') 
        .addField('Moderator:', 
        `${message.author.tag}`)
        .addField('Muted User:', message.mentions.users.first())
        .addField('Reason', reason)
        .addField('Offences: ', 'This is, '+message.mentions.users.first()+' '+db.get(`{reputation}_${message.mentions.users.first().id}`)+' offence!')
        .addField('Info: ', message.mentions.users.first()+' Has, '+db.get(`{warnp}_${message.mentions.users.first().id}`)+' Warning(s), '+db.get(`{mutep}_${message.mentions.users.first().id}`)+' Mute(s), '+db.get(`{kickp}_${message.mentions.users.first().id}`)+' Kick(s), '+db.get(`{banp}_${message.mentions.users.first().id}`)+' Ban(s)!')
        message.channel.send(`This has been logged and a REP point was added!`)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(mutemsg);
    }
}

module.exports = MuteCommand;