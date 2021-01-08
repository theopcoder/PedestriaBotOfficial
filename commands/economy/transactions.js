const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'transactions',
			group: 'economy',
			memberName: 'transactions',
			description: 'View your transactions history!',
		});
	}

	run(message, args) {
		const TransactionHistoryMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#85bb65")
			.setThumbnail(message.author.displayAvatarURL())
			.setTitle("Transaction History")
			.setDescription(`
				**Transactions:**

				${db.get(`{ConfirmationMessage}_${message.author.id}`)}
			`)
		message.channel.send(TransactionHistoryMessage);
	}
};