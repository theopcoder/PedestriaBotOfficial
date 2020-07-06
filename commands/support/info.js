const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

class InfoCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "info",
            group: "support",
            memberName: 'info',
            description: 'Sends you a message with information about Pedestria!'
        });
    }

    async run(message, args)
    {
        const PedestriaInfo = new discord.RichEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setFooter("This is some information about Pedestra! Missing something? Tell us in #suggestions!")
            .setTitle('Pedestria Information')
            .addField("Information: ", 
            `
                Minecraft IP: play.pedestriamc.com :satellite:
                Website: https://www.pedestriamc.com/ :globe_with_meridians:
                Store: https://store.pedestriamc.com/ :shopping_cart:

            `)
        message.channel.sendEmbed(PedestriaInfo)
    }
}

module.exports = InfoCommand;