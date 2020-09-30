const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class OpenClosedCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "apprtoggle",
            group: "staffsignup",
            memberName: 'apprtoggle',
            description: 'This will open/close application requests!' 
        });
    }

    async run(message, args)
    {
        if(!message.member.hasPermission("ADMINISTRATOR"))
        {
            message.channel.send(":warning: You do NOT have the permission to perform this command! :warning:")
            .then(msg => {
                msg.delete(10000)
            })
            return;
        }
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        if (!reason) return message.reply('Do you want to open or close application requests? EXP: !apprtoggle open or !apprtoggle close')
        .then(msg => {
            msg.delete(10000)
        });
        if (reason == 'open'){
            if (db.get("closedrequests")== 1)return message.reply("Sorry, Application Requests are already **open!**");
            db.add("closedrequests", 1)+message.reply("Successfully **opened** Application Requests!");
        }
        
        if (reason == 'close'){
            if (db.get("closedrequests")== 0)return message.reply("Sorry, Application Requests are already **closed!**");
            db.subtract("closedrequests", 1)+message.reply("Successfully **closed** Application Requests!");
        }
    }
}

module.exports = OpenClosedCommand;