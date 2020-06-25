const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

class WarnCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "warn",
            group: "admin",
            memberName: 'warn',
            description: 'Warns a user!'
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
        let WarnedUser = message.guild.member(message.mentions.users.first());
        if(!WarnedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        if (WarnedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't warn a staff member! :no_entry_sign:")
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        {
            if (!reason) return message.reply(':warning: Please supply a reason for the warn!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        {
            message.reply('Has warned '+message.mentions.users.first()+ ' For, '+reason)
            .then(msg => {
                msg.delete(10000)
            })
        }
        {
            db.get(`{warnp}_${message.mentions.members.first().id}`)
            db.add(`{warnp}_${message.mentions.members.first().id}`, 1);
        }
        {
            db.get(`{reputation}_${message.mentions.members.first().id}`)
            db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        }
        const warnmsg = new discord.RichEmbed()
        .setColor("0xFFA500")
        .setTimestamp()
        .setThumbnail(message.author.avatarURL) //update this to show the mentioned users pfp
        .addField('Action:', 'Warn') 
        .addField('Moderator:', 
        `${message.author.tag}`)
        .addField('Warned User:', message.mentions.users.first())
        .addField("User ID:", message.mentions.users.first().id)
        .addField('Reason', reason)
        .addField('Offences: ', 'This is, '+message.mentions.users.first()+' '+db.get(`{reputation}_${message.mentions.users.first().id}`)+' offence!')
        .addField('Info: ', message.mentions.users.first()+' Has, '+db.get(`{warnp}_${message.mentions.users.first().id}`)+' Warning(s), '+db.get(`{mutep}_${message.mentions.users.first().id}`)+' Mute(s), '+db.get(`{kickp}_${message.mentions.users.first().id}`)+' Kick(s), '+db.get(`{banp}_${message.mentions.users.first().id}`)+' Ban(s)!')
        message.channel.send(`This has been logged and a REP point was added!`)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(warnmsg);
    }
}

module.exports = WarnCommand;