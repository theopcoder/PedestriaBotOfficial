const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			group: 'support',
			memberName: 'info',
			description: `Gives you information about the Pedestria Discord server and PedestriaBot Official!`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        const InfoMessage = new discord.MessageEmbed()
            .setColor("0x20B2AA")
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .setTitle(`${message.guild.name}`)
            .addField("Server Info:", `
                :satellite: **Minecraft IP:** play.pedestriamc.com
                :globe_with_meridians: **Website:** https://www.pedestriamc.com/
                :shopping_cart: **Store:** https://store.pedestriamc.com/
                :person_in_tuxedo: **Members:** ${message.guild.memberCount}
            `)
            .addField("Bot Info:", `
                :technologist:**Developer:** ${Developer}
                :shield: **Version:** ${Version}
                :gear: **BuildID** ${BuildID}
                :desktop: **GitHub repository:** https://github.com/theopcoder/PedestriaBotOfficial
            `)
        message.channel.send(InfoMessage);
	}
};