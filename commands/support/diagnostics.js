const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class DiagnosticsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'diagnostics',
			group: 'support',
			memberName: 'diagnostics',
            description: `This runs a diagnostics test and fixes any database issues you may be expiriencing.`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		let words = args.split(' ');
		let diagnostic = words.slice(0).join(' ');

		if (!diagnostic){
			const DiagnosticOptions = new discord.MessageEmbed()
				.setColor("#FFA500")
				.setTimestamp()
				.setTitle("Diagnostic Options")
				.setDescription(`
					1. Fix XP Status
				`)
			return message.channel.send(DiagnosticOptions);
		}

		const NoActionsNeeded = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#66ff00")
			.setTitle("No Action Needed")
		let NoActionNeededMessage = message.channel.send(NoActionsNeeded);

		if (diagnostic == "1"){
			if(db.get(`${message.author.id}.basic.xp`) > MaxXP){
				db.delete(`${message.author.id}.basic.xp`);
				return message.reply(`Successfully repaired your xp!`);
			}else{
				return NoActionNeededMessage;
			}
		}
	}
};