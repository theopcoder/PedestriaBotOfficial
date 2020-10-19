const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class UnmuteCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "unmute",
            group: "admin",
            memberName: 'unmute',
            description: 'Unmutes a user.'
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
        let UnmutedUser = message.guild.member(message.mentions.users.first());
        if(!UnmutedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        if (UnmutedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't unmute a staff member! :no_entry_sign:");
            return;
        }
        let UserNotMutedMessage = message.reply(`${message.mentions.users.first().username} isn't muted!`);
        if (db.get(`{CurrentlyMuted}_${message.mentions.users.first().id}`)== null)return UserNotMutedMessage;
        if (db.get(`{CurrentlyMuted}_${message.mentions.users.first().id}`)== 0)return UserNotMutedMessage;
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason) return message.reply(':warning: Please supply a reason for the unmute!')
        .then(msg => {
            msg.delete(10000);
        });

        db.subtract(`{CurrentlyMuted}_${message.mentions.users.first().id}`, 1);
        let role = message.guild.roles.find(r => r.name === "Muted");
        let member = message.mentions.members.first();
        member.removeRole(role);

        let users = message.mentions.users.first();
        let TimesBypassMuted = db.get(`{MyteBypass}_${message.mentions.users.first().id}`); if(TimesBypassMuted == null)TimesBypassMuted = "0";

        const ChatUnmutemsg = new discord.RichEmbed()
            .setColor("0x008000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField("Moderator:", message.author)
            .addField("Unmuted User:", message.mentions.users.first())
            .addField("Reason:", reason)
            .setFooter(`Successfully unmuted ${message.mentions.users.first().tag}!`)
        message.channel.sendEmbed(ChatUnmutemsg);

        const UnmuteMSG = new discord.RichEmbed()
            .setTimestamp()
            .setColor()
            .setTitle("Unmute:")
            .setDescription(`
                **Moderator:** ${message.author}
                **Unmuted User:** ${UnmutedUser}
                **User ID:** ${message.mentions.users.first().id}
                **Times Bypassed Mute:** ${TimesBypassMuted}
                **Reason:** ${reason}
            `)
        let logchannel = message.guild.channels.find('name', 'pedestriabot-logs');
        db.delete(`{MuteBypass}_${message.mentions.users.first().id}`);
        return logchannel.send(UnmuteMSG);

    }
}

module.exports = UnmuteCommand;