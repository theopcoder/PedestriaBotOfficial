const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class MuteCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "mute",
            group: "admin",
            memberName: 'mute',
            description: 'Mutes a player.'
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
        let MutedUser = message.guild.member(message.mentions.users.first());
        if(!MutedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        if (MutedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't mute a staff member! :no_entry_sign:")
            return;
        }

        if (db.get(`{CurrentlyMuted}_${message.mentions.users.first().id}`)== 1){
            message.reply(`:warning: ${message.mentions.users.first().username} is already muted!`)
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason) return message.reply(':warning: Please supply a reason for the mute!')
        .then(msg => {
            msg.delete(10000);
        });
        let role = message.guild.roles.find(r => r.name === "Muted");
        let member = message.mentions.members.first();
        member.addRole(role);
        
        db.add(`{CurrentlyMuted}_${message.mentions.users.first().id}`, 1);
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        db.add(`{mutep}_${message.mentions.members.first().id}`, 1);
        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        message.mentions.members.first().send(`You have been muted from ${message.guild.name} because, ${reason}.`);

        const ChatMutemsg = new discord.RichEmbed()
            .setColor("0x000000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField("Moderator:", message.author)
            .addField("Muted User:", MutedUser)
            .addField("Reason:", reason)
            .setFooter("Successfully logged the mute!")
        message.channel.sendEmbed(ChatMutemsg);

        const Mutemsg = new discord.RichEmbed()
            .setColor("0x000000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Mute:")
            .setDescription(`
                **Moderator:** ${message.author}
                **Muted User:** ${MutedUser}
                **User ID:** ${message.mentions.users.first().id}
                **Reason:** ${reason}
                **Total Offences:** ${RepP}
                **Other Offences:** Warnings: ${WarnP} | Mutes: ${MuteP} | Kicks: ${KickP} | Bans: ${BanP}
            `)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(Mutemsg);
    }
}

module.exports = MuteCommand;