const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class StoreCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "store",
            group: "economy",
            memberName: 'store',
            description: 'A list of items you can buy with the bot currency!'
        });
    }

    async run(message, args)
    {//TODO finish command in the next update
        message.reply(Error1)
        const MentionedUsersMoney = new discord.RichEmbed()
            .setColor(0x668d3c)
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Store")
            .addField("User:", message.mentions.users.first())
            .addField("Bal:", `$${MentionedUsersBalance}`)
            .addField("WARNING:", "This command is not done yet! This command will be worked on in future updates!")
        message.channel.sendEmbed(MentionedUsersMoney);
    }
}

module.exports = StoreCommand;