const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class AcceptCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "accept",
            group: "staffsignup",
            memberName: 'accept',
            description: 'Accepts a users application request!'
        });
    }

    async run(message, args)
    {
        message.delete()
        if(!message.member.hasPermission("ADMINISTRATOR"))
        {
            message.channel.send(":warning: You do NOT have the permission to perform this command! :warning:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let AcceptedUser = message.guild.member(message.mentions.users.first());
        if(!AcceptedUser)
        {
            message.channel.send("Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason) return message.reply('Please supply a reason for the Accept!')
        .then(msg => {
            msg.delete(10000);
        });
        message.reply('Has accepted, '+message.mentions.users.first()+' Application request because, '+reason);
        
        const acceptmsg = new discord.RichEmbed()
            .setColor("0x008000")
            .setTimestamp()
            .setFooter('Hi their! This bot is in BETA. If you find any bugs report them in #report-a-bug')
            .addField("Congrats!")
            .addField("You're application request was accpted because, ", reason)
        message.mentions.users.first().sendEmbed(acceptmsg);
        message.mentions.members.first().send("You're application request was accpted because, "+reason);
    }
}

module.exports = AcceptCommand;