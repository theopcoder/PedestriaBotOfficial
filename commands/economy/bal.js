const Commando = require("discord.js-commando");
const discord = require('discord.js');
const db = require('quick.db');

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
            const UserMoney = new discord.RichEmbed()
            .setTitle("Money Balence")
            .setDescription('Shows how much money a user has!')
            .setColor(0x668d3c)
            .setDescription(message.mentions.users.first()+' Has, $'+ db.get(`{money}_${message.mentions.members.first().id}`));
            message.channel.sendEmbed(UserMoney);
        }else{
            const UserMoney = new discord.RichEmbed()
            .setTitle("Money Balence")
            .setDescription('Shows how much money a user has!')
            .setColor(0x668d3c)
            .setThumbnail(message.author.avatarURL)
            .setDescription(message.author+' Has, $'+ db.get(`{money}_${message.author.id}`));
            message.channel.sendEmbed(UserMoney);
        }
    }
}

module.exports = BallenceCommand;