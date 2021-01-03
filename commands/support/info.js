const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			group: 'support',
			memberName: 'info',
			description: `Gives you information about the Pedestria Discord server and Pedestria Bot Official`,
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
                Members: ${message.guild.memberCount}
            `)
            .addField("Bot Info:", `
                :technologist:**Developer:** theopcoder
                :shield: **Version:** ${Version}
                :desktop: **GitHub repository:** https://github.com/theopcoder/PedestriaBotOfficial
            `)
            .setFooter(`Missing something? Tell us in #suggestions!`)
        message.channel.send(InfoMessage);
	}
};