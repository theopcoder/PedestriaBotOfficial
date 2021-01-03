const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class HistoryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'history',
			group: 'admin',
			memberName: 'history',
			description: 'View a users previous violations!',
		});
	}

	run(message, args) {
		if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if (!message.member.hasPermission("MANAGE_MESSAGES")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000})
			});
			return;
		}
		let HistoryUser = message.guild.member(message.mentions.users.first());
        if(!HistoryUser) {
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}

		let WarnHistory = db.get(`{WarnReason}_${message.mentions.users.first().id}`); if (WarnHistory == null)WarnHistory = "Nothing";
		let MuteHistory = db.get(`{MuteReason}_${message.mentions.users.first().id}`); if (MuteHistory == null)MuteHistory = "Nothing";
		let KickHistory = db.get(`{KickReason}_${message.mentions.users.first().id}`); if (KickHistory == null)KickHistory = "Nothing";
		let BanHistory = db.get(`{BanReason}_${message.mentions.users.first().id}`); if (BanHistory == null)BanHistory = "Nothing";
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		const UserHistory = new discord.MessageEmbed()
			.setTimestamp()
			.setColor()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("User History")
			.setDescription(`User: ${HistoryUser}`)
			.addField("Warnings:", WarnHistory)
			.addField("Mutes:", MuteHistory)
			.addField("Kicks:", KickHistory)
			.addField("Bans:", BanHistory)
		message.channel.send(UserHistory);
	}
};