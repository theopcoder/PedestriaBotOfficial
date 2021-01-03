const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TempMuteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tempmute',
			group: 'admin',
			memberName: 'tempmute',
			description: 'Temporarily mutes a user!',
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
			message.channel.send(PermissionErrorMessage);
			return;
		}
		let TempMutedUser = message.guild.member(message.mentions.users.first());
        if(!TempMutedUser){
			const NullUserMessage = new discord.MessageEmbed()
				.setColor()
				.setDescription(NullUser)
			message.channel.send(NullUserMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		if (TempMutedUser.hasPermission("MANAGE_MESSAGES")){
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
		let time = words.slice(1).join(' ');
		if(!time){
			const NoTimeWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: How many hours do you want to mute ${message.mentions.users.first().username}?`)
			message.channel.send(NoTimeWarning).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
		let reason = words.slice(2).join(' ');
        if (!reason){
			const NoReasonWarning = new discord.MessageEmbed()
				.setColor()
				.setDescription(`:warning: Please supply a reason for the temporary mute!`)
			message.channel.send(NoReasonWarning).then(message => {
                message.delete({timeout: 10000});
			});
			return;
		}

		db.add(`${message.mentions.users.first().id}.admin.Mutes`, 1);
		db.add(`${message.mentions.users.first().id}.admin.Violations`, 1);
		db.add(`${message.mentions.users.first().id}.admin.CurrentlyMuted`, 1);
		var MuteViolationNumber = db.add(`{MuteViolationNumber}_${message.mentions.users.first().id}`, 1);
		db.push(`{MuteReason}_${message.mentions.users.first().id}`, `**TempMute ${MuteViolationNumber}:** [Mod: ${message.author} | Time: ${new Date().toLocaleString()}] ${words.slice(1).join(' ')}`);
		let Violations = db.get(`${message.mentions.users.first().id}.admin.Violations`); if (Violations == null)Violations = "0";
		let Warnings = db.get(`${message.mentions.users.first().id}.admin.Warnings`); if (Warnings == null)Warnings = "0";
		let Mutes = db.get(`${message.mentions.users.first().id}.admin.Mutes`); if (Mutes == null)Mutes = "0";
		let Kicks = db.get(`${message.mentions.users.first().id}.admin.Kicks`); if (Kicks == null)Kicks = "0";
		let Bans = db.get(`${message.mentions.users.first().id}.admin.Bans`); if (Bans == null)Bans = "0";
		let users = message.mentions.users.first();

		let MuteRole = message.guild.roles.cache.get(MuteRoleID);
		TempMutedUser.roles.add(MuteRole);
		let MemberRole = message.guild.roles.cache.get(NewMemberRoleID);
		MutedUser.roles.remove(MemberRole).then(function(){
			TempMutedUser.send(`You have been temporarily muted on ${message.guild.name} because, ${reason}.`);
		});

		const ChatTempMuteMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Temporary Mute")
			.setDescription(`
				**Moderator:** ${message.author}
				**User:** ${TempMutedUser}
				**Time:** ${words[1]} hours
				**Reason:** ${reason}
			`)
		message.channel.send(ChatTempMuteMessage);

		const TempMuteLogMessage = new discord.MessageEmbed()
			.setColor("0xFFA500")
			.setTimestamp()
			.setThumbnail(users.displayAvatarURL())
			.setTitle("Temporary Mute")
			.setDescription(`
				**Moderator:** ${message.author}
				**TempMuted User:** ${TempMutedUser}
				**User ID:** ${message.mentions.users.first().id}
				**Time:** ${words[1]} hours
				**Reason:** ${reason}
				**Total Offences:** ${Violations}
				**Other Offences:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
			`)
		let LogChannel = message.guild.channels.cache.get(LogChannelID);
		LogChannel.send(TempMuteLogMessage);

		setTimeout(() => {
			db.subtract(`${message.mentions.users.first().id}.admin.CurrentlyMuted`, 1);
			let TimesBypassedMute = db.get(`${message.mentions.users.first().id}.admin.TimesBypassedMute`); if (TimesBypassedMute == null)TimesBypassedMute = "0";
			db.delete(`${message.mentions.users.first().id}.admin.TimesBypassedMute`);
			let MuteRole = message.guild.roles.cache.get(MuteRoleID);
			TempMutedUser.roles.remove(MuteRole);
			let MemberRole = message.guild.roles.cache.get(NewMemberRoleID);
			MutedUser.roles.remove(MemberRole).then(function(){
				TempMutedUser.send(`You have been unmuted on ${message.guild.name} because, ${reason}.`);
			});
	
			const ChatUnmuteMessage = new discord.MessageEmbed()
				.setColor("#33ab63")
				.setTimestamp()
				.setThumbnail(users.displayAvatarURL())
				.setTitle("Unmute")
				.setDescription(`
					**Moderator:** <@635572455439597569>
					**User:** ${TempMutedUser}
					**Reason:** ${reason}
				`)
			message.channel.send(ChatUnmuteMessage);
	
			const UnmuteLogMessage = new discord.MessageEmbed()
				.setColor("#33ab63")
				.setTimestamp()
				.setThumbnail(users.displayAvatarURL())
				.setTitle("Unmute")
				.setDescription(`
					**Moderator:** <@635572455439597569>
					**TempMuted User:** ${TempMutedUser}
					**User ID:** ${message.mentions.users.first().id}
					**Mute Evasions:** ${TimesBypassedMute}
					**Reason:** ${reason}
				`)
			let LogChannel = message.guild.channels.cache.get(LogChannelID);
			LogChannel.send(UnmuteLogMessage);
		}, 1000 * 60 * 60 * words[1]);
	}
};