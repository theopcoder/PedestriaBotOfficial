const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class StoreCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'store',
			group: 'economy',
			memberName: 'store',
			description: 'Allows you to buy items from the bot store!',
		});
	}

	run(message, args) {
		let Balance = db.get(`${message.author.id}.basic.money`); if (Balance == null)Balance = "0";

		const StoreMessage = new discord.MessageEmbed()
			.setTimestamp()
			.setColor("#668d3c")
			.setTitle("Store")
			.setDescription(`
				There are no items for sale at the moment!
			`)
			.setFooter(`Your Balance: $${Balance}`)
		message.channel.send(StoreMessage);
	}
};