const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

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
        if (RankUser)
        {   
            let RankMentionsLevel = db.get(`{Level}_${message.mentions.users.first().id}`); if (RankMentionsLevel == null)RankMentionsLevel = "0";
            let RankMentionsXP = db.get(`{xp}_${message.mentions.users.first().id}`); if (RankMentionsXP == null)RankMentionsXP = "0";
            let users = message.mentions.users.first();
            const RankMentions = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(users.displayAvatarURL)
                .setTitle("Rank")
                .addField("User:", message.mentions.users.first())
                .addField("Level, ", RankMentionsLevel)
                .addField("XP: ", RankMentionsXP)
            message.channel.sendEmbed(RankMentions);
        }else{
            let RankUserLevel = db.get(`{Level}_${message.author.id}`); if (RankUserLevel == null)RankUserLevel = "0";
            let RankUserXP = db.get(`{xp}_${message.author.id}`); if (RankUserXP == null)RankUserXP = "0";
            const RankUser = new discord.RichEmbed()
                .setColor(0x668d3c)
                .setThumbnail(message.author.avatarURL)
                .setTitle("Rank")
                .addField("User:", message.author)
                .addField("Level, ", RankUserLevel)
                .addField("XP: ", RankUserXP)
            message.channel.sendEmbed(RankUser);
        }
    }
}

module.exports = RankCommand;