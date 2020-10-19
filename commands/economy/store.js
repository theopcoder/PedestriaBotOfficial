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

    async run(message, args)
    {
        let Money = db.get(`{money}_${message.author.id}`); if (Money == null)Money = "0";

        const Store = new discord.RichEmbed()
            .setColor(0x668d3c)
            .setThumbnail(message.author.displayAvatarURL)
            .setTitle("Store")
            .addField("Balance:", `$${Money}`)
            .addField("Items:", `
                There is nothing for sale yet!
            `)
        message.channel.sendEmbed(Store);
    }
}

module.exports = StoreCommand;