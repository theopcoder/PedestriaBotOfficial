const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class MirrorCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mirror',
			group: 'simple',
			memberName: 'mirror',
			description: 'Shows you your pfp!',
		});
	}

	run(message, args) {
        if (message.mentions.users.first()){
            const MentionUsersPFP = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.mentions.users.first().displayAvatarURL())
            message.channel.send(MentionUsersPFP);
        }else{
            const YourPFP = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.author.displayAvatarURL())
            message.channel.send(YourPFP);
        }
	}
};