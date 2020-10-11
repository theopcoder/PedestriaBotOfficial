const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class UserInfoCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "ui",
            group: "admin",
            memberName: 'ui',
            description: 'Shows a moderator your stats and violations.'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        let UserInfo = message.guild.member(message.mentions.users.first());
        if(!UserInfo)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }

        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let Level = db.get(`{Level}_${message.mentions.users.first().id}`); if (Level == null)Level = "0";
        let Money = db.get(`{money}_${message.mentions.users.first().id}`); if (Money == null)Money = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let XP = db.get(`{xp}_${message.mentions.users.first().id}`); if (XP == null)XP = "0";
        let users = message.mentions.users.first();

        const UserInfomsg = new discord.RichEmbed()
            .setColor("#03adfc")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setTitle("User Info")
            .setDescription(`
                **Mentioned User:** ${UserInfo}
                **User ID:** ${message.mentions.users.first().id}
                **Money:** ${Money}
                **Rank:** Level, ${Level} | XP, ${XP}
                **Violations:** ${RepP}
                **Other Offences:** Warnings: ${WarnP} | Mutes ${MuteP} | Kicks ${KickP} | Bans ${BanP}
            `)
        message.channel.sendEmbed(UserInfomsg);
    }
}

module.exports = UserInfoCommand;