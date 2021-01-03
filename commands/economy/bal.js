const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class BalanceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bal',
			group: 'economy',
			memberName: 'bal',
			description: 'Allows you to check your balance!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		let BalUser = message.guild.member(message.mentions.users.first());
        if (BalUser)
        {
            let BalMentions = db.get(`${message.mentions.users.first().id}.basic.money`); if (BalMentions == null)BalMentions = "0";
			let users = message.mentions.users.first();
			
			const UserMoney = new discord.MessageEmbed()
				.setTimestamp()
                .setColor("#668d3c")
				.setThumbnail(users.displayAvatarURL())
				.setTitle("Money Balence")
				.setDescription(`
					**User:** ${BalUser}
					**Balance:** $${BalMentions}
				`)
            message.channel.send(UserMoney);
        }else{
			let Bal = db.get(`${message.author.id}.basic.money`); if (Bal == null)Bal = "0";
			
			const UserMoney = new discord.MessageEmbed()
				.setTimestamp()
				.setColor("#668d3c")
				.setThumbnail(message.author.displayAvatarURL())
				.setTitle("Money Balence")
				.setDescription(`**Balance:** $${Bal}`)
            message.channel.send(UserMoney);
        }
	}
};