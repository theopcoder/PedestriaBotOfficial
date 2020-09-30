const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class TempMuteCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "tempmute",
            group: "admin",
            memberName: 'tempmute',
            description: 'Temporarily mutes a user.'
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
        let TempMutedUser = message.guild.member(message.mentions.users.first());
        if(!TempMutedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        if (TempMutedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't mute a staff member! :no_entry_sign:");
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
        let time = words.slice(1).join(' ');
        let reason = words.slice(2).join(' ');
        if(!time)return message.reply(`:warning: How many hours do you want to mute ${message.mentions.users.first().username}?`)
        .then(msg => {
            msg.delete(10000);
        });

        if (!isNaN(args[1])){
            message.reply("Please make sure to only use numbers!");
            return;
        }

        if (!reason)return message.reply(':warning: Please supply a reason for the temp mute!')
        .then(msg => {
            msg.delete(10000);
        });

        db.add(`{CurrentlyMuted}_${message.mentions.users.first().id}`, 1);
        db.add(`{reputation}_${message.mentions.members.first().id}`, 1);
        db.add(`{mutep}_${message.mentions.members.first().id}`, 1);
        let RepP = db.get(`{reputation}_${message.mentions.users.first().id}`); if (RepP == null)RepP = "0";
        let WarnP = db.get(`{warnp}_${message.mentions.users.first().id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.mentions.users.first().id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.mentions.users.first().id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.mentions.users.first().id}`); if (BanP == null)BanP = "0";
        let users = message.mentions.users.first();

        let member = message.mentions.members.first();
        let role = message.guild.roles.find(r => r.name === "Muted");
        member.addRole(role);
        let MemberRole = message.guild.roles.find(r => r.name === "Member");
        member.removeRole(MemberRole);

        setInterval(() => {
            if (db.get(`{CurrentlyMuted}_${message.mentions.users.first().id}`)== 1){
                let member = message.mentions.members.first();
                let MemberRole = message.guild.roles.find(r => r.name === "Member");
                member.addRole(MemberRole);
                let MutedRole = message.guild.roles.find(r => r.name === "Muted");
                member.removeRole(MutedRole);
                let TimesBypassMuted = db.get(`{MyteBypass}_${message.mentions.users.first().id}`); if(TimesBypassMuted == null)TimesBypassMuted = "0";

                const UnmuteMSG = new discord.RichEmbed()
                    .setTimestamp()
                    .setColor()
                    .setThumbnail(users.displayAvatarURL)
                    .setTitle("Unmute:")
                    .setDescription(`
                        **Moderator:** <@635572455439597569>
                        **Unmuted User:** ${TempMutedUser}
                        **User ID:** ${message.mentions.users.first().id}
                        **Times Bypassed Mute:** ${TimesBypassMuted}
                        **Reason:** ${words[1]} hour mute is over.
                    `)
                let logchannel = message.guild.channels.find('name', 'logs');
                logchannel.send(UnmuteMSG);

                message.mentions.members.first().send(`You have been unmuted on ${message.guild.name} because, Times up.`);
                db.subtract(`{CurrentlyMuted}_${message.mentions.users.first().id}`, 1);
                db.delete(`{MuteBypass}_${message.mentions.users.first().id}`);
                return;
            }else{
                return;
            }
        }, words[1] * 1000 * 60);

        const TempMuteChatmsg = new discord.RichEmbed()
            .setColor("0x000000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField("Moderator:", message.author)
            .addField("Temp Muted User:", message.mentions.users.first())
            .addField("Reason:", reason)
            .addField("Time:", `${words[1]} hours`)
            .setFooter("Successfully logged the temp mute!")
        message.channel.sendEmbed(TempMuteChatmsg);

        const TempMutemsg = new discord.RichEmbed()
            .setColor("0x000000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Temp Mute:")
            .setDescription(`
                **Moderator:** ${message.author}
                **Temp Muted User:** ${TempMutedUser}
                **User ID:** ${message.mentions.users.first().id}
                **Reason:** ${reason}
                **Total Offences:** ${RepP}
                **Other Offences:** Warnings: ${WarnP} | Mutes: ${MuteP} | Kicks: ${KickP} | Bans: ${BanP}
            `)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(TempMutemsg);
    }
}

module.exports = TempMuteCommand;