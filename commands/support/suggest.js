const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

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
        if (!reason) return message.reply("Please say your suggestion!")
        .then(msg => {
            msg.delete(10000);
        });

        const Suggestmsg = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setTitle('Suggestion')
            .addField('User:', `${message.author}`)
            .addField('Sugestion', reason)
            .setFooter("Click the green check to like the idea or the red x if you don't like the idea!")
        let logchannel = message.guild.channels.find('name', 'suggestions'); 
        logchannel.send(Suggestmsg).then(embedMessage => {
            embedMessage.react("✅");
            embedMessage.react("🤷");
            embedMessage.react("❌");
        });
    }
}

module.exports = SuggestCommand;
