const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class SettingsCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "settings",
            group: "admin",
            memberName: 'settings',
            description: 'Shows settings able to be toggled off and on by administrators.'
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("ADMINISTRATOR"))
        {
            message.channel.send(":no_entry_sign: You do NOT have the permission to perform this command! :no_entry_sign:")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');

        if (!reason) message.channel.send("Do you need help turning a feature on/off? Do -settings help to get started!");
        if (reason == "help")
        {
            const BotSettingsHelp = new discord.RichEmbed()
                .setColor("0xFFA500")
                .setTimestamp()
                .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvypYAFynUpTRITuiYvJstD17LjWB2zIzfLA&usqp=CAU')//I do not own this image. The image is from google.com. Click the link for the image
                .setTitle("Bot Settings Help")
                .addField("Feature Available: ", 
                `These are features you are able to turn off! The names in parentheses are nicknames
                    1. Message Level System (mls)
                    2. Application requests (ar)
                    3. Dead Chat Pings (dcp)
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
            message.channel.sendEmbed(BotSettingsHelp);
        }

        //MLS(Message Level System) Settings
        if (reason == "mls on")
        {
            if (db.get("MLS")== 1)return message.reply("Sorry, the Message Level System is already on!");
            db.add("MLS", 1);
            const MessageLevelSystemOnMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Message Level System")
            message.channel.sendEmbed(MessageLevelSystemOnMSG);
            return;
        }
        if (reason == "mls off")
        {
            if (db.get("MLS")== 0)return message.reply("Sorry, the Message Level System is already off!");
            db.subtract("MLS", 1);
            const MessageLevelSystemOffMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Message Level System")
            message.channel.sendEmbed(MessageLevelSystemOffMSG);
            return;
        }
        if (db.get("MLS")== 1){
            var MLS = ":white_check_mark: On";
        }else{
            MLS = ":x: Off";
        }

        //Application requests settings
        if (reason == "ar on")
        {
            if (db.get("closedrequests")== 1)return message.reply("Sorry, Application Requests are already on!");
            db.add("closedrequests", 1);

            const ApplicationRequestsOnMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Application Requests")
            message.channel.sendEmbed(ApplicationRequestsOnMSG);
            return;
        }
        if (reason == "ar off")
        {
            if (db.get("closedrequests")== 0)return message.reply("Sorry, Application Requests are already off!");
            db.subtract("closedrequests", 1);

            const ApplicationRequestsOffMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Application Requests")
            message.channel.sendEmbed(ApplicationRequestsOffMSG);
            return;
        }
        if (db.get("closedrequests")== 1){
            var AR = ":white_check_mark: On";
        }else{
            AR = ":x: Off";
        }

        //Dead chat settings
        if (reason == "dcp on")
        {
            if (db.get("DeadChatMessage")== 1)return message.reply("Sorry, Dead Chat Pings are already on!");
            db.add("DeadChatMessage", 1);

            const DeadChatPingOnMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Dead Chat Pings")
            message.channel.sendEmbed(DeadChatPingOnMSG);
            return;
        }
        if (reason == "dcp off")
        {
            if (db.get("DeadChatMessage")== 0)return message.reply("Sorry, Dead Chat Pings are already off!");
            db.subtract("DeadChatMessage", 1);

            const DeadChatPingOffMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Dead Chat Pings")
            message.channel.sendEmbed(DeadChatPingOffMSG);
            return;
        }
        if (db.get("DeadChatMessage")== 1){
            var DCP = ":white_check_mark: On";
        }else{
            DCP = ":x: Off";
        }

        //Auto Moderation
        if (reason == "am on")
        {
            if (db.get("AutoModeration")== 1)return message.reply("Sorry, Auto Moderation are already on!");
            db.add("AutoModeration", 1);

            const AutoModerationOnMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSHOE6W5TPcNNcN3q4IOLbjm9GkWgxtsG8JUQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned On: Auto Moderation")
            message.channel.sendEmbed(AutoModerationOnMSG);
            return;
        }
        if (reason == "am off")
        {
            if (db.get("AutoModeration")== 0)return message.reply("Sorry, Auto Moderation are already off!");
            db.subtract("AutoModeration", 1);

            const AutoModerationOffMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("#FF0000")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTnJvyL87Y_UNJSonX5e-H6-KCfmleTU2zmQ&usqp=CAU")//I do not own this image. I found this image on google.com. Click the link to head to the picture!
                .setTitle("Turned Off: Auto Moderation")
            message.channel.sendEmbed(AutoModerationOffMSG);
            return;
        }
        if (db.get("AutoModeration")== 1){
            var AM = ":white_check_mark: On";
        }else{
            AM = ":x: Off";
        }

        //Settings message
        const BotSettings = new discord.RichEmbed()
            .setColor("0xFFA500")
            .setTimestamp()
            .setThumbnail('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTvypYAFynUpTRITuiYvJstD17LjWB2zIzfLA&usqp=CAU')//I do not own this image. The image is from google.com. Click the link for the image
            .setTitle("Bot Settings")
            .addField("Message Level System: ", MLS)
            .addField("Application Requests: ", AR)
            .addField("AutoModeration:", AM)
            .addField("DeadChatPings:", DCP)
        message.channel.sendEmbed(BotSettings);
    }
}

module.exports = SettingsCommand;