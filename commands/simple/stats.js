const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class StatsCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "stats",
            group: "simple",
            memberName: 'stats',
            description: 'A command that tells you your over all stats!'
        });
    }

    async run(message, args)
    {
        let RepP = db.get(`{reputation}_${message.author.id}`); if (RepP == null)RepP = "0";
        let Level = db.get(`{Level}_${message.author.id}`); if (Level == null)Level = "0";
        let Money = db.get(`{money}_${message.author.id}`); if (Money == null)Money = "0";
        let WarnP = db.get(`{warnp}_${message.author.id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.author.id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.author.id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.author.id}`); if (BanP == null)BanP = "0";
        let XP = db.get(`{xp}_${message.author.id}`); if (XP == null)XP = "0";
        let users = message.mentions.users.first();

        const UserStats = new discord.RichEmbed()
            .setTimestamp()
            .setColor("#ADD8E6")
            .setThumbnail(message.author.avatarURL)
            .addField("Rank:", `
                Level: ${Level}
                XP: ${XP}
            `)
            .addField("Balance:", `$${Money}`)
            .addField(`Other Offences:`, `Warnings: ${WarnP} | Mutes: ${MuteP} | Kicks: ${KickP} | Bans: ${BanP}`)
        message.channel.sendEmbed(UserStats);
    }
}

module.exports = StatsCommand;