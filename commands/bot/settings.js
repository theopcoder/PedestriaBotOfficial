const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SettingsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'settings',
			group: 'bot',
			memberName: 'settings',
			description: 'Control and change the bot settings.',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if (!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000});
			});
			return;
		}
        let words = args.split(' ');
        let settings = words.slice(0).join(' ');

        if (settings == "help"){
            const SettingsHelpMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FFA500")
                .attachFiles('./Images/SettingsCog.png')
                .setThumbnail('attachment://SettingsCog.png')
                .setTitle("Settings Help")
                .setDescription(`
                    **(1)** Level Up System
                    **(2)** Dead Chat Pings
                    **(3)** Auto Moderation
                    **(4)** Staff Applications

                    To turn a setting off or on, do -setting <number> on/off
                    Example: -setting 1 off
                `)
            message.channel.send(SettingsHelpMessage);
            return;
        }

        //Level Up Settings
        if (settings == "1 on"){
            db.set("settings.LevelUpSystem", 1);
            const LevelUpOnMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully turned on Level Ups!`)
            message.channel.send(LevelUpOnMessage);
            return;
        }
        if (settings == "1 off"){
            db.set("settings.LevelUpSystem", 0);
            const LevelUpOffMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully turned off Level Ups!`)
            message.channel.send(LevelUpOffMessage);
            return;
        }
        //Dead Chat Ping Settings
        if (settings == "2 on"){
            db.set("settings.DeadChatPings", 1);
            const LevelUpOnMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully turned on Dead Chat Pings!`)
            message.channel.send(LevelUpOnMessage);
            return;
        }
        if (settings == "2 off"){
            db.set("settings.DeadChatPings", 0);
            const LevelUpOnMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully turned off Dead Chat Pings!`)
            message.channel.send(LevelUpOnMessage);
            return;
        }
        //Auto Moderation Settings
        if (settings == "3 on"){
            db.set("settings.AutoModeration", 1);
            const AutoModerationOnMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully turned on Auto Moderation!`)
            message.channel.send(AutoModerationOnMessage);
            return;
        }
        if (settings == "3 off"){
            db.set("settings.AutoModeration", 0);
            const AutoModerationOnMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully turned off Auto Moderation!`)
            message.channel.send(AutoModerationOnMessage);
            return;
        }
        //Staff Application Settings
        if (settings == "4 on"){
            db.set("settings.StaffApplications", 1);
            const StaffApplicationsOnMessage = new discord.MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`:white_check_mark: Successfully turned on Staff Applications!`)
            message.channel.send(StaffApplicationsOnMessage);
            return;
        }
        if (settings == "4 off"){
            db.set("settings.StaffApplications", 0);
            const StaffApplicationsOffMessage = new discord.MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`:x: Successfully turned off Staff Applications!`)
            message.channel.send(StaffApplicationsOffMessage);
            return;
        }

        let LevelUpSetting = db.get("settings.LevelUpSystem"); if (LevelUpSetting == 1)LevelUpSetting = ":white_check_mark: On"; else LevelUpSetting = ":x: Off"
        let DeadChatPingSetting = db.get("settings.DeadChatPings"); if (DeadChatPingSetting == 1)DeadChatPingSetting = ":white_check_mark: On"; else DeadChatPingSetting = ":x: Off"
        let AutoModerationSetting = db.get("settings.AutoModeration"); if (AutoModerationSetting == 1)AutoModerationSetting = ":white_check_mark: On"; else AutoModerationSetting = ":x: Off"
        let StaffApplicationSetting = db.get("settings.StaffApplications"); if (StaffApplicationSetting == 1)StaffApplicationSetting = ":white_check_mark: On"; else StaffApplicationSetting = ":x: Off"

        const SettingsMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#FFA500")
            .attachFiles('./Images/SettingsCog.png')
            .setThumbnail('attachment://SettingsCog.png')
            .setTitle("Settings")
            .setDescription(`
                **(1) Level Ups:** ${LevelUpSetting}
                **(2) Dead Chat Pings:** ${DeadChatPingSetting}
                **(3) Auto Moderation:** ${AutoModerationSetting}
                **(4) Staff Applications:** ${StaffApplicationSetting}
            `)
            .setFooter("Do -settings help for help!")
        message.channel.send(SettingsMessage);
	}
};