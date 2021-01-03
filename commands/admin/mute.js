const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class MuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mute',
			group: 'admin',
			memberName: 'mute',
			description: 'Mutes a user!',
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
		let MutedUser = message.guild.member(message.mentions.users.first());
        if(!MutedUser){
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (MutedUser.hasPermission("MANAGE_MESSAGES")){
			const StaffUserMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(StaffUser)
			message.channel.send(StaffUserMessage).then(message => {
				message.delete({timeout: 10000})
			});
            return;
		}
		if (db.get(`${message.mentions.users.first().id}.admin.CurrentlyMuted`)== 1){
			const UserAlreadyMutedMessage = new discord.MessageEmbed()
				.setColor("	#FF0000")
				.setDescription(UserAlreadyMuted)
			return message.channel.send(UserAlreadyMutedMessage);
		}
		let words = args.split(' ');
		let reason = words.slice(1).join(' ');
		if(!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the mute!`)
			message.channel.send(NoReasonWarning).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}

		let MuteRole = message.guild.roles.cache.get(MuteRoleID);
		MutedUser.roles.add(MuteRole);
		let MemberRole = message.guild.roles.cache.get(NewMemberRoleID);
		MutedUser.roles.remove(MemberRole).then(function(){
			MutedUser.send(`You have been muted on ${message.guild.name} because, ${reason}.`);
		});

		db.add(`${message.mentions.users.first().id}.admin.Mutes`, 1);
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		db.add(`${message.mentions.users.first().id}.admin.CurrentlyMuted`, 1);
		var MuteViolationNumber = db.add(`{MuteViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{MuteReason}_${message.mentions.users.first().id}`, `**Mute ${MuteViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] ${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		const ChatMuteMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Mute")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${MutedUser}
				**Reason:** ${reason}
			`)
		message.channel.send(ChatMuteMessage);

		const MuteLogMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Mute")
			.setDescription(`
				**Moderator:** ${message.author}
				**Muted User:** ${MutedUser}
				**User ID:** ${message.mentions.users.first().id}
				**Reason:** ${reason}
				**Total Offences:** ${Violations}
				**Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
		let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(MuteLogMessage);
	}
};