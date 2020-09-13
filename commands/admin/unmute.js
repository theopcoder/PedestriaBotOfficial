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
                msg.delete(10000)
            });
            return;
        }
        let UnmutedUser = message.guild.member(message.mentions.users.first());
        if(!UnmutedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        if (UnmutedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't unmute a staff member! :no_entry_sign:")
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        if (!reason) return message.reply(':warning: Please supply a reason for the unmute!')
        .then(msg => {
            msg.delete(10000)
        });

        let role = message.guild.roles.find(r => r.name === "Muted");
        let member = message.mentions.members.first();
        member.removeRole(role)

        let users = message.mentions.users.first();

        const ChatMutemsg = new discord.RichEmbed()
            .setColor("0x008000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField("Moderator:", message.author)
            .addField("Unmuted User:", message.mentions.users.first())
            .addField("Reason:", reason)
            .setFooter(`Successfully unmuted ${message.mentions.users.first().tag}!`)
        message.channel.sendEmbed(ChatMutemsg)

        const Unmutemsg = new discord.RichEmbed()
            .setColor("0x008000")
            .setTimestamp()
            .setThumbnail(users.displayAvatarURL)
            .addField('Action:', 'Unmute') 
            .addField('Moderator:', 
            `${message.author}`)
            .addField('Unmuted User:', message.mentions.users.first())
            .addField("User ID:", message.mentions.users.first().id)
            .addField('Reason:', reason)
        let logchannel = message.guild.channels.find('name', 'logs');
        return logchannel.send(Unmutemsg);
    }
}

module.exports = UnmuteCommand;