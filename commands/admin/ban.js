const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class BanCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "ban",
            group: "admin",
            memberName: 'ban',
            description: 'Bans a user!'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("BAN_MEMBERS"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let bannedUser = message.guild.member(message.mentions.users.first());
        if(!bannedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        if (bannedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't ban a staff member! :no_entry_sign:");
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason) return message.reply(':warning: Please supply a reason for the ban!')
        .then(msg => {
            msg.delete(10000)
        });

        //this messages the user why they were ban
        message.mentions.members.first().send("You have been banned from "+message.guild.name+" because, "+reason+".");
        message.guild.member(bannedUser).ban(reason)
        //.then(console.log)
        .catch(console.error);

        db.add(`{banp}_${message.mentions.members.first().id}`, 1);
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        const ChatBanmsg = new discord.RichEmbed()
            .setColor("0xFF0000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField("Moderator:", message.author)
            .addField("Banned User:", message.mentions.users.first())
            .addField("Reason:", reason)
            .setFooter("Successfully logged the ban!")
        message.channel.sendEmbed(ChatBanmsg)

        const Banmsg = new discord.RichEmbed()
            .setColor("0xFF0000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField('Action:', 'Ban') 
            .addField('Moderator:', 
            `${message.author}`)
            .addField('Banned User:', message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField('Reason:', reason)
            .addField('Offences:', `${message.mentions.users.first()} has **${db.get(`{reputation}_${message.mentions.users.first().id}`)}** offence(s).`)
            .addField("Other Offences:", `${message.mentions.users.first()} has, ${WarnP} Warning(s), ${MuteP} Mute(s), ${KickP} Kick(s), ${BanP} Ban(s).`)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(Banmsg);
    }
}

module.exports = BanCommand;