const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

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
        message.delete();
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');

        if (!reason)return message.reply("Please describe the bug, where it occured and any error information if provided! Ex: -bug PedestriaBot -flip not working. Error 2.")
        .then(msg => {
            msg.delete(10000)
        });

        const banmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter("Click the green check to like the idea or the red x to not have the suggestion done!")
            .setTitle('Suggestion')
            .addField('User:', 
            `${message.author}`)
            .addField('Sugestion', reason)
        let logchannel = message.guild.channels.find('name', 'bug-reports');
        logchannel.send(banmsg);
    }
}

module.exports = BugCommand;