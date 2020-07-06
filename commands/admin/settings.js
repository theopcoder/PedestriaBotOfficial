const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

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
                msg.delete(10000)
            })
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');

        if (!reason) message.channel.send("Do you need help turning a feature on/off? Do -settings help to get started!")
        if (reason == "help")
        {
            const BotSettingsHelp = new discord.RichEmbed()
            .setColor("0xFFA500")
            .setTimestamp()
            .setTitle("Bot Settings Help")
            .addField("Feature Available: ", 
            `These are features you are able to turn off! The names in parentheses are nicknames
                1. Message Level System (mls)
                2. Application requests (ar)
            `)
            .addField("Turn On features: ", 
            `
                To turn a feature on, do -settings (Feature nick name above) on
                Example: -settings mls on
            `)
            .addField("Turn Off features: ", 
            `
                To turn a feature off, do -settings (Feature nick name above) off
                Example: -settings mls off
            `)
            .addField("Congrats!", "You now know how to turn features on/off! You can always refer back to this by doing the command -settings help")
            message.channel.sendEmbed(BotSettingsHelp)
        }

        //MLS Settings
        if (reason == "mls on")
        {
            if (db.get("MLS")== 1)return message.reply("Sorry, the Message Level System is already on!")
            db.add("MLS", 1)
            message.reply("Successfully turned on the Message Level System!")
        }
        if (reason == "mls off")
        {
            if (db.get("MLS")== 0)return message.reply("Sorry, the Message Level System is already off!")
            db.subtract("MLS", 1)
            message.reply("Successfully turned off the Message Level System!")
        }
        if (db.get("MLS")== 1){
            var MLS = "On"
        }else{
            MLS = "Off";
        }
        //Application requests settings
        if (reason == "ar on")
        {
            if (db.get("closedrequests")== 1)return message.reply("Sorry, Application Requests are already on!")
            db.add("closedrequests", 1)
            message.reply("Successfully turned **on** Application Requests!")
        }
        if (reason == "ar off")
        {
            if (db.get("closedrequests")== 0)return message.reply("Sorry, Application Requests are already off!")
            db.subtract("closedrequests", 1)
            message.reply("Successfully turned **off** Application Requests!")
        }

        if (db.get("closedrequests")== 1){
            var AR = "On"
        }else{
            AR = "Off";
        }

        //Settings message
        const BotSettings = new discord.RichEmbed()
        .setColor("0xFFA500")
        .setTimestamp()
        .setTitle("Bot Settings")
        .addField("Message Level System: ", MLS)
        .addField("Application Requests: ", AR)
        message.channel.sendEmbed(BotSettings)
    }
}

module.exports = SettingsCommand;