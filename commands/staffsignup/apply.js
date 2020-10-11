const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class ApplyCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "apply",
            group: "staffsignup",
            memberName: 'apply',
            description: 'Allows you to apply for staff!'
        });
    }

    async run(message, args)
    {
        if (db.get('closedrequests')== 1)return message.reply('Im sorry, Application requests are closed');
        if(message.member.hasPermission("MANAGE_MESSAGES"))return message.reply('Sorry, You are already staff! ;)');
        if (db.get(`{reputation}_${message.author.id}`) > 1) return message.reply(' I am sorry, '+message.author+" You have over one rep point which means untill you can get it to one rep point or less you can't apply for staff!");
        message.reply('Successfully sent Application request!')
        .then(msg => {
            msg.delete(10000);
        });

        const applymsg = new discord.RichEmbed()
            .setColor("0xde9a12")
            .setTimestamp()
            //.setFooter('Hi Their! This bot is in BETA. If you find any bugs report them in #report-a-bug')
            .setTitle("Application Requests.")
            .addField('Questions: ',
            `
            1. What's your IGN (In Game Name)
            2. What's your discord name? (Plus numbers)
            3. How old are you? (Minimum age is 13, exceptions can be made if your application is excellent.)
            4. Do you have a microphone?
            5. Are you capable of recording evidence?
            6. Why do you want to be staff on PedestriaMC?
            7. Tell us about your real life self.
            8. Why should we pick you over another candidate?
            9. Have you read/follow all the rules?
            `)
            .addField("Submitting answers:", 'To send answers do, -answers 1.Mr.Pizza 2. MyEpicDiscordName#2222 and so on.')
        message.member.sendEmbed(applymsg);
    }
}

module.exports = ApplyCommand;