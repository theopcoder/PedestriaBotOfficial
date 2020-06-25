const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

class SuggestCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "suggest",
            group: "support",
            memberName: 'suggest',
            description: 'This will send your suggestion in #suggestions channel!'
        });
    }

    async run(message, args)
    {
        message.delete();
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        {
            if (!reason) return message.reply("Please say what you wan't to suggest/add to the server!")
            .then(msg => {
                msg.delete(10000)
            })
        }
        {
            const banmsg = new discord.RichEmbed()
                .setColor("0x20B2AA")
                .setTimestamp()
                .setFooter("Click the green check to like the idea or the red x to not have the suggestion done!")
                .setTitle('Suggestion')
                .addField('User:', 
                `${message.author}`)
                .addField('Sugestion', reason)
            let logchannel = message.guild.channels.find('name', 'suggestions'); 
            logchannel.send(banmsg).then(embedMessage => {
                embedMessage.react("✅");
                embedMessage.react("❌");
            });
        }
        const applymsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter('Hi Their! This bot is in BETA. If you find any bugs report them in #report-a-bug')
            .setTitle("Suggestion")
            .addField("User:", message.author)
            .addField("Suggestion:", reason)
            .addField(`Hey, _${message.author.tag}. Your suggestion has been sent to the #suggestion channel to be voted on!`, "-PedestriaBotOfficial")
            .addField("Please wait until it gets approved or rejected by a staff member.", "-PedestriaTeam")
        message.member.sendEmbed(applymsg);
    }
}

module.exports = SuggestCommand;