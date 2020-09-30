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
            description: 'A list of items you can buy from the bot!'
        });
    }

    //TODO finish command in the an update
    async run(message, args)
    {
        let Money = db.get(`{money}_${message.mentions.users.first().id}`); if (Money == null)Money = "0";

        const Store = new discord.RichEmbed()
            .setColor(0x668d3c)
            .setThumbnail(users.displayAvatarURL)
            .setTitle("Store")
            .addField("Balance:", `$${Money}`)
            .addField("Items:", `
                Null
            `)
            .addField("WARNING:", "This command is not done yet! This command will be worked on in future updates!")
        message.channel.sendEmbed(Store);
        message.reply(Error3);
    }
}

module.exports = StoreCommand;