const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

class BugCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "bug",
            group: "support",
            memberName: 'bug',
            description: 'Send a bug report to #bug-reports'
        });
    }

    async run(message, args)
    {
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');

        if (!reason)return message.reply("Please describe the bug, where it occured and any error information if provided! Ex: -bug PedestriaBot -flip not working. Error 2.")
        .then(msg => {
            msg.delete(10000)
        });

        db.add("BugNumber", 1)

        const Bugmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setTitle('Bug Report')
            .addField('User:', 
            `${message.author}`)
            .addField("Bug Number:", db.get("BugNumber"))
            .addField('Bug: ', reason)
            .setFooter("Thank you for sending the Bug Report! Developers will try and fix the issue as soon as possible! Sincerely, Pedestria Team")
        let logchannel = message.guild.channels.find('name', 'bug-reports');
        message.channel.send(`Successfully sent your bug report ${message.author}!`)
        logchannel.send(Bugmsg);
    }
}

module.exports = BugCommand;