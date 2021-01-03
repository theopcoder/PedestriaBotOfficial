const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class DataTransferCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'transfer',
			group: 'support',
			memberName: 'transfer',
			description: 'Transfers your old data to to new data!',
		});
	}

	run(message, args) {
		if (db.get(`${message.author.id}.DataTransferComplete`)== 1){
			message.reply("You have already transfered your data! If something didn't transfer correctly, message TheMLGDude#2177 on Discord!");
			return;
		}
		message.reply("Transfering your data... :open_file_folder:");

		let RepP = db.get(`{reputation}_${message.author.id}`); if (RepP == null)RepP = "0";
        let Level = db.get(`{Level}_${message.author.id}`); if (Level == null)Level = "0";
        let Money = db.get(`{money}_${message.author.id}`); if (Money == null)Money = "0";
        let WarnP = db.get(`{warnp}_${message.author.id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.author.id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.author.id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.author.id}`); if (BanP == null)BanP = "0";
		let XP = db.get(`{xp}_${message.author.id}`); if (XP == null)XP = "0";
	
		db.add(`${message.author.id}.admin.Violations`, RepP);
		db.add(`${message.author.id}.admin.Warnings`, WarnP);
		db.add(`${message.author.id}.admin.Kicks`, KickP);
		db.add(`${message.author.id}.admin.Mutes`, MuteP);
		db.add(`${message.author.id}.basic.level`, Level);
		db.add(`${message.author.id}.basic.money`, Money);
		db.add(`${message.author.id}.admin.Bans`, BanP);
		db.add(`${message.author.id}.basic.xp`, XP);

		db.add(`${message.author.id}.DataTransferComplete`, 1);

		setTimeout(function(){
			message.reply("Successfully transfered your data! :file_cabinet:");
		}, 3000);
	}
};