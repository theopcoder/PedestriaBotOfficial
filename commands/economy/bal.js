const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

class BallenceCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "bal",
            group: "economy",
            memberName: 'bal',
            description: 'Shows you how much money a user has!'
        });
    }

    async run(message, args)
    {
        let BalUser = message.guild.member(message.mentions.users.first());
        if (BalUser)
        {
            let BalMentions = db.get(`{money}_${message.mentions.users.first().id}`); if (BalMentions == null)BalMentions = "0";
            let users = message.mentions.users.first();
            const UserMoney = new discord.RichEmbed()
                .setTitle("Money Balence")
                .setDescription('Shows how much money a user has!')
                .setColor(0x668d3c)
                .setThumbnail(users.displayAvatarURL)
                .setDescription(message.mentions.users.first()+' Has, $'+ BalMentions);
            message.channel.sendEmbed(UserMoney);
        }else{
            let Bal = db.get(`{money}_${message.author.id}`); if (Bal == null)Bal = "0";
            const UserMoney = new discord.RichEmbed()
                .setTitle("Money Balence")
                .setDescription('Shows how much money a user has!')
                .setColor(0x668d3c)
                .setThumbnail(message.author.avatarURL)
                .setDescription(message.author+' Has, $'+ Bal);
            message.channel.sendEmbed(UserMoney);
        }
    }
}

module.exports = BallenceCommand;