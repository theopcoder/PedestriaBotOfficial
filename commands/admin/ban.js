const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

class BanCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "ban",
            group: "admin",
            memberName: 'ban',
            description: 'Bans a user!'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("BAN_MEMBERS"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let bannedUser = message.guild.member(message.mentions.users.first());
        if(!bannedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        if (bannedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't ban a staff member! :no_entry_sign:")
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        {
            if (!reason) return message.reply(':warning: Please supply a reason for the ban!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        //this messages the user why they were ban
        message.mentions.members.first().send("Hi there! You have been banned from, "+message.guild.name+" because, "+reason+".")
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        db.add(`{banp}_${message.mentions.members.first().id}`, 1);
        {
            message.guild.member(bannedUser).ban(reason)
            .then(console.log)
            .catch(console.error);
        }
        message.reply('Has banned, '+message.mentions.users.first()+' for, '+reason)
        .then(msg => {
            msg.delete(10000)
        })
        const banmsg = new discord.RichEmbed()
            .setColor("0xff0000")
            .setTimestamp()
            .addField('Action:', 'Ban') 
            .addField('Staff:', 
            `${message.author.tag}`)
            .addField('Banned User:', message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField('Reason', reason)
            .addField('Offences: ', 'This is, '+message.mentions.users.first()+' '+db.get(`{reputation}_${message.mentions.users.first().id}`)+' offence!')
            .addField('Info: ', message.mentions.users.first()+' Has, '+db.get(`{warnp}_${message.mentions.users.first().id}`)+' Warning(s), '+db.get(`{mutep}_${message.mentions.users.first().id}`)+' Mute(s), '+db.get(`{kickp}_${message.mentions.users.first().id}`)+' Kick(s), '+db.get(`{banp}_${message.mentions.users.first().id}`)+' Ban(s)!')
        message.channel.send(`This has been logged and a rep point was added!`)
        let logchannel = message.guild.channels.find('name', 'logs'); 
        return logchannel.send(banmsg);
    }
}

module.exports = BanCommand;