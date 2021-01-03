const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class StatsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stats',
			group: 'simple',
			memberName: 'stats',
			description: 'Shows you your stats!',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        let MentionedStatsUser = message.guild.member(message.mentions.users.first());
        if (MentionedStatsUser){
            if (!message.member.hasPermission("MANAGE_MESSAGES")){
                const PermissionErrorMessage = new discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription(`${PermissionError}`)
                message.channel.send(PermissionErrorMessage).then(message => {
                    message.delete({timeout: 10000})
                });
                return;
            }
            let Violations = db.get(`${message.mentions.users.first().id}.admin.violations`); if (Violations == null)Violations = "0";
            let Warnings = db.get(`${message.mentions.users.first().id}.admin.warnings`); if (Warnings == null)Warnings = "0";
            let Level = db.get(`${message.mentions.users.first().id}.basic.level`); if (Level == null)Level = "0";
            let Money = db.get(`${message.mentions.users.first().id}.basic.money`); if (Money == null)Money = "0";
            let Mutes = db.get(`${message.mentions.users.first().id}.admin.mutes`); if (Mutes == null)Mutes = "0";
            let Kicks = db.get(`${message.mentions.users.first().id}.admin.kicks`); if (Kicks == null)Kicks = "0";
            let Bans = db.get(`${message.mentions.users.first().id}.admin.bans`); if (Bans == null)Bans = "0";
            let XP = db.get(`${message.mentions.users.first().id}.basic.xp`); if (XP == null)XP = "0";
            let users = message.mentions.users.first();
    
            const MentionedUserStats = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#ADD8E6")
                .setAuthor(`Data Requester: ${message.author.tag}`, message.author.displayAvatarURL())
                .setThumbnail(users.displayAvatarURL())
                .setTitle("User Stats")
                .setDescription(`
                    **User:** ${MentionedStatsUser}
                    **User ID:** ${message.mentions.users.first().id}
                    **Balance:** $${Money}
                    **Rank:** Level: ${Level} | XP: ${XP}
                    **Violations:** ${Violations}
                    **Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
                    **CurrentlyMuted:** ${db.get(`${message.mentions.users.first().id}.admin.CurrentlyMuted`)}
                `)
            return message.channel.send(MentionedUserStats);
        }
        let Violations = db.get(`${message.author.id}.admin.violations`); if (Violations == null)Violations = "0";
        let Warnings = db.get(`${message.author.id}.admin.warnings`); if (Warnings == null)Warnings = "0";
        let Level = db.get(`${message.author.id}.basic.level`); if (Level == null)Level = "0";
        let Money = db.get(`${message.author.id}.basic.money`); if (Money == null)Money = "0";
        let Mutes = db.get(`${message.author.id}.admin.mutes`); if (Mutes == null)Mutes = "0";
        let Kicks = db.get(`${message.author.id}.admin.kicks`); if (Kicks == null)Kicks = "0";
        let Bans = db.get(`${message.author.id}.admin.bans`); if (Bans == null)Bans = "0";
        let XP = db.get(`${message.author.id}.basic.xp`); if (XP == null)XP = "0";

        const UserStats = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#ADD8E6")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setTitle("Stats")
            .setDescription(`
                **Rank:** Level: ${Level} | XP: ${XP}
                **Balance:** $${Money}
                **Violations:** ${Violations}
                **Other Violations:** Warnings: ${Warnings} | Mutes: ${Mutes} | Kicks: ${Kicks} | Bans: ${Bans}
            `)
        message.channel.send(UserStats);
	}
};