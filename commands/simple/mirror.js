const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

class MirrorCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "mirror",
            group: "simple",
            memberName: 'mirror',
            description: 'Shows you your pfp!'
        });
    }

    async run(message, args)
    {
        let MirrorUser = message.guild.member(message.mentions.users.first());
        let users = message.mentions.users.first();

        if (MirrorUser)
        {
            message.reply(users.displayAvatarURL);
        }else{
            message.reply(message.author.avatarURL)
        }
    }
}

module.exports = MirrorCommand;