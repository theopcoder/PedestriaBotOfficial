const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SettingsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'settings',
			group: 'admin',
			memberName: 'settings',
			description: 'Configure the bot settings.',
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
		}
		if(!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000})
			});
			return;
        }
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');

        if (!reason) message.channel.send("Do you need help turning a feature on/off? Do -settings help to get started!");
        if (reason == "help")
        {
            const BotSettingsHelp = new discord.MessageEmbed()
                .setColor("0xFFA500")
                .setTimestamp()
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvypYAFynUpTRITuiYvJstD17LjWB2zIzfLA&usqp=CAU')//I do not own this image. The image is from google.com. Click the link for the image
                .setTitle("Bot Settings Help")
                .addField("Feature Available: ", 
                `These are features you are able to turn off! The names in parentheses are nicknames
                    1. Message Level System (mls)
                    2. Application requests (ar)
                    3. Auto Moderation (am)
                    4. Dead Chat Pings (dcp)
                `)
                .addField("Turn On features: ", 
                `
                    To turn a feature on, do -settings (Settings name above) on
                    Example: -settings mls on
                `)
                .addField("Turn Off features: ", 
                `
                    To turn a feature off, do -settings (Settings name above) off
                    Example: -settings mls off
                `)
                .addField("Congrats!", "You now know how to turn features on/off! You can always refer back to this by doing the command -settings help")
            message.channel.send(BotSettingsHelp);
        }

        //MLS(Message Level System) Settings
        if (reason == "mls on")
        {
            if (db.get("LevelUpsSetting")== 1)return message.reply("Sorry, the Message Level System is already on!");
            db.add("LevelUpsSetting", 1);
            const MessageLevelSystemOnMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Message Level System")
            message.channel.send(MessageLevelSystemOnMSG);
            return;
        }
        if (reason == "mls off")
        {
            if (db.get("LevelUpsSetting")== 0)return message.reply("Sorry, the Message Level System is already off!");
            db.subtract("LevelUpsSetting", 1);
            const MessageLevelSystemOffMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Message Level System")
            message.channel.send(MessageLevelSystemOffMSG);
            return;
        }
        if (db.get("LevelUpsSetting")== 1){
            var MLS = ":white_check_mark: On";
        }else{
            MLS = ":x: Off";
        }

        //Application requests settings
        if (reason == "ar on"){
            if (db.get("StaffApplicationsSetting")== 1)return message.reply("Sorry, Application Requests are already on!");
            db.add("StaffApplicationsSetting", 1);

            const ApplicationRequestsOnMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Application Requests")
            message.channel.send(ApplicationRequestsOnMSG);
            return;
        }
        if (reason == "ar off"){
            if (db.get("StaffApplicationsSetting")== 0)return message.reply("Sorry, Application Requests are already off!");
            db.subtract("StaffApplicationsSetting", 1);

            const ApplicationRequestsOffMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Application Requests")
            message.channel.send(ApplicationRequestsOffMSG);
            return;
        }
        if (db.get("StaffApplicationsSetting")== 1){
            var AR = ":white_check_mark: On";
        }else{
            AR = ":x: Off";
        }

        //Dead chat settings
        if (reason == "dcp on"){
            if (db.get("DeadChatPingSetting")== 1)return message.reply("Sorry, Dead Chat Pings are already on!");
            db.add("DeadChatPingSetting", 1);

            const DeadChatPingOnMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Dead Chat Pings")
            message.channel.send(DeadChatPingOnMSG);
            return;
        }
        if (reason == "dcp off"){
            if (db.get("DeadChatPingSetting")== 0)return message.reply("Sorry, Dead Chat Pings are already off!");
            db.subtract("DeadChatPingSetting", 1);

            const DeadChatPingOffMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Dead Chat Pings")
            message.channel.send(DeadChatPingOffMSG);
            return;
        }
        if (db.get("DeadChatPingSetting")== 1){
            var DCP = ":white_check_mark: On";
        }else{
            DCP = ":x: Off";
        }

        //Auto Moderation
        if (reason == "am on"){
            if (db.get("AutoModerationSetting")== 1)return message.reply("Sorry, Auto Moderation are already on!");
            db.add("AutoModerationSetting", 1);

            const AutoModerationOnMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Auto Moderation")
            message.channel.send(AutoModerationOnMSG);
            return;
        }
        if (reason == "am off"){
            if (db.get("AutoModerationSetting")== 0)return message.reply("Sorry, Auto Moderation are already off!");
            db.subtract("AutoModerationSetting", 1);

            const AutoModerationOffMSG = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Auto Moderation")
            message.channel.send(AutoModerationOffMSG);
            return;
        }
        if (db.get("AutoModerationSetting")== 1){
            var AM = ":white_check_mark: On";
        }else{
            AM = ":x: Off";
        }

        //Settings message
        const BotSettings = new discord.MessageEmbed()
            .setColor("0xFFA500")
            .setTimestamp()
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvypYAFynUpTRITuiYvJstD17LjWB2zIzfLA&usqp=CAU')//I do not own this image. The image is from google.com. Click the link for the image
            .setTitle("Bot Settings")
            .addField("Message Level System: ", MLS)
            .addField("Application Requests: ", AR)
            .addField("AutoModeration:", AM)
            .addField("DeadChatPings:", DCP)
        message.channel.send(BotSettings);
	}
};