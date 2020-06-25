const Commando = require("discord.js-commando");

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
        let KickedUser = message.guild.member(message.mentions.users.first());

        message.reply(message.author.avatarURL)

        let users = message.mentions.users.first();

        if (KickedUser)
        {
            message.reply(users.displayAvatarURL)
        }
    }
}

module.exports = MirrorCommand;