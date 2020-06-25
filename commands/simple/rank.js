const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

class RankCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "rank",
            group: "simple",
            memberName: 'rank',
            description: 'Shows you your rank level!'
        });
    }

    async run(message, args)
    {
        let RankUser = message.guild.member(message.mentions.users.first());
        {
            if (RankUser)
            {   
                const RankMentions = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(message.author.avatarURL)
                .setTitle("Rank")
                .addField("User:", message.mentions.users.first())
                .addField("Level, "+ db.get(`{Level}_${message.mentions.users.first().id}`)+" XP, "+db.get(`{xp}_${message.mentions.users.first().id}`))
                message.channel.sendEmbed(RankMentions);
            }
            else
            {
                const RankUser = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(message.author.avatarURL)
                .setTitle("Rank")
                .addField("User:", message.mentions.users.first())
                .addField("Level, ", db.get(`{Level}_${message.author.id}`)+" XP, "+db.get(`{xp}_${message.author.id}`))
                message.channel.sendEmbed(RankUser);
            }
        }
    }
}

module.exports = RankCommand;