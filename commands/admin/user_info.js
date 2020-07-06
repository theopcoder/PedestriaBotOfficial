const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

class UserInfoCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "ui",
            group: "admin",
            memberName: 'ui',
            description: 'Shows you a little about a person. Example: how much money or wanrs they have!'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let UserInfo = message.guild.member(message.mentions.users.first());
        if(!UserInfo)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }

        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        const UserInfomsg = new discord.RichEmbed()
        .setColor("0xFFA500")
        .setTimestamp()
        .setThumbnail(users.displayAvatarURL)
        .setTitle("User Info")
        .addField('Mentioned User:', message.mentions.users.first())
        .addField("User ID:", message.mentions.users.first().id)
        .addField("Money:", db.get(`{money}_${message.mentions.users.first().id}`))
        .addField("Rank:", `${message.mentions.users.first()} is Level, ${db.get(`{Level}_${message.mentions.users.first().id}`)} and has, ${db.get(`{xp}_${message.mentions.users.first().id}`)} xp!`)
        .addField('Violations:', 'This is, '+message.mentions.users.first()+' '+db.get(`{reputation}_${message.mentions.users.first().id}`)+' offence!')
        .addField("Other offences:", `${message.mentions.users.first()} has, ${WarnP} Warning(s), ${MuteP} Mute(s), ${KickP} Kick(s), ${BanP} Ban(s).`)
        message.channel.sendEmbed(UserInfomsg)
    }
}

module.exports = UserInfoCommand;