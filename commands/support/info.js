const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

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
                :satellite: Minecraft IP: play.pedestriamc.com
                :globe_with_meridians: Website: https://www.pedestriamc.com/
                :shopping_cart: Store: https://store.pedestriamc.com/
                Members: ${message.guild.memberCount}
            `)
            .addField("Bot Info:", 
            `
                **Developer:** theopcoder
                **Version:**  ${Version}
                **GitHub repository:** https://github.com/theopcoder/PedestriaBotOfficial
            `)
        message.channel.sendEmbed(PedestriaInfo);
    }
}

module.exports = InfoCommand;