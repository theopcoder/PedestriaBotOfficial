const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SurvivalGameCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'survival',
			group: 'simple',
			memberName: 'survival',
			description: 'A built in survival game!',
		});
    }
    //TODO Finish survival game command

	run(message, args) {
		message.reply(Error4);
	}
};