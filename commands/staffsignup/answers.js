const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

class AnswerCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "answers",
            group: "staffsignup",
            memberName: 'answers',
            description: 'This sends your application request answers to staff!'
        });
    }

    async run(message, args)
    {
        message.delete()
        { 
            if (db.get('closedrequests')== 1)return message.reply('Im sorry, Application requests are closed')
        }
        if (message.member.hasPermission("MANAGE_MESSAGES"))
        {
            message.reply("Sorry, But you are already a staff member! ;)")
        }
        if (db.get(`{reputation}_${message.author.id}`) > 1) return message.reply("Sorry, You need 1 rep point or less to sign up for staff!")
        .then(msg => {
            msg.delete(10000)
        })
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        {
            if (!reason) return message.reply('Please write your answers!')
            .then(msg => {
                msg.delete(10000)
            })
        }
        message.guild.channels.get('706526751513378828').send(message.author+" Answers: "+reason);
        message.member.send("Successfully sent answers to staff! Please be patient for this process may take a while. If no one gets back to you in 7 days please speak to a admin! If you recive a error message saying ```An error occurred while running the command: RangeError: RichEmbed field values may not exceed 1024 characters. You shouldn't ever receive an error like this. Please contact the bot owner.``` Your answers were still submitted!")
        //message.reply('Successfully sent Application request!')
        {
            const answermsg = new discord.RichEmbed()
            .setColor("0x05ff2f")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .addField('Action:', 'Application answers') 
            .addField('User:', 
            `${message.author.tag}`)
            .addField('Answers: ', reason)
            .addField('Info: ', message.author+' Has, '+db.get(`{warnp}_${message.author.id}`)+' Warning(s), '+db.get(`{mutep}_${message.author.id}`)+' Mute(s), '+db.get(`{kickp}_${message.author.id}`)+' Kick(s), '+db.get(`{banp}_${message.author.id}`)+' Ban(s)!')
            let logchannel = message.guild.channels.find('name', 'logs'); 
            return logchannel.send(answermsg);
        }
    }
}

module.exports = AnswerCommand;