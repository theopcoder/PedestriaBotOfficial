const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class BugCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bug',
			group: 'support',
			memberName: 'bug',
			description: `Create a bug report!`,
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
		message.delete();
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        if (!reason) return message.reply(":warning: Incomplete command! What's the bug report?").then(message => {
            message.delete({timeout: 10000});
        });
		db.add("BugNumber", 1);

		const BugMessage = new discord.MessageEmbed()
			.setColor("#20B2AA")
			.setTimestamp()
            .setThumbnail(message.author.avatarURL())
			.setTitle("Bug Report")
			.setDescription(`
				**User:** ${message.author}
				**Bug Number:** ${db.get("BugNumber")}
				**Bug:** ${reason}
			`)
		let BugReportChannel = message.guild.channels.cache.get(BugReportChannelID);
		BugReportChannel.send(BugMessage);
		message.channel.send(`Successfully sent your bug report ${message.author}!`);
	}
};