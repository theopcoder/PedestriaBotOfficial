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
        let MirrorUser = message.mentions.users.first();

        if (MirrorUser)
        {
            const MentionedPFP = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(MirrorUser.displayAvatarURL())
            message.channel.send(MentionedPFP);
        }else{
            const AuthorPFP = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.author.displayAvatarURL())
            message.channel.send(AuthorPFP);
        }
	}
};