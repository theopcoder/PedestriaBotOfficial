const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SpellingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'spelling',
			group: 'fun',
			memberName: 'spelling',
			description: 'How did you mess up your spelling!?',
		});
	}

	run(message, args) {
        message.channel.send("https://tenor.com/view/minor-spelling-mistake-gif-21179057");
	}
};