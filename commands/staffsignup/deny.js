const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class DenyCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "deny",
            group: "staffsignup",
            memberName: 'deny',
            description: "Deny's a users application request."
        });
    }

    async run(message, args)
    {
        message.delete()
        if(!message.member.hasPermission("ADMINISTRATOR"))
        {
            message.channel.send(":warning: You do NOT have the permission to perform this command! :warning:")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason) return message.reply('Please supply a reason for the Deny!')
        .then(msg => {
            msg.delete(10000);
        });
        message.reply(' Has Denied, '+message.mentions.users.first()+' Application request because, '+reason);

        const denymsg = new discord.RichEmbed()
            .setColor("0x0341fc")
            .setTimestamp()
            //.setFooter('Hi Their! This bot is in BETA. If you find any bugs report them in #report-a-bug')
            .addField("Try again next time!")
            .addField("You're request was Denied because, "+reason)
        message.mentions.users.first().sendEmbed(denymsg);
        message.mentions.members.first().send("You're request was Denied because, "+reason);
    }
}

module.exports = DenyCommand;