const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

class SurvivalCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "survival",
            group: "simple",
            memberName: 'survival',
            description: 'A fun game you can play. Currently a W.I.P so please be kind to the command. Thanks! :)'
        });
    }

    async run(message, args)
    {
        if(!message.member.roles.find(r => r.name === "Bot Dev")){
            message.reply("Im sorry, this command has not yet been implemented. Please check again in the next bot update! Note: If you bypass this message, please know this command may not work and issues may occur!");
            return;
        }
        let MutedUser = message.guild.member(message.mentions.users.first());
        if(!MutedUser)
        {
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        if (MutedUser.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply(":no_entry_sign: Sorry, you can't mute a staff member! :no_entry_sign:")
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(1).join(' ');
        {
            if (!reason) return message.reply(':warning: Please supply a reason for the mute!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        message.reply("Bypassed check")
    }
}

module.exports = SurvivalCommand;