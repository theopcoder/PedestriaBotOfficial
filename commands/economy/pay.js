const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class PayCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "pay",
            group: "economy",
            memberName: 'pay',
            description: 'You can give money to other users!'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        let PayedUser = message.guild.member(message.mentions.users.first());
        if(!PayedUser){
            message.channel.send(":warning: Sorry, I couldn't find that user")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        let words = args.split(' ');
        let payment = words.slice(1).join(' ');
        if (!payment) return message.reply(`:warning: How much money do you want to give to ${message.mentions.users.first()}?`)
        .then(msg => {
            msg.delete(10000)
        });
        if (isNaN(words[1])){
            message.reply("There where invalid charectors for the payment! Please make sure the payment is only numbers!")
            .then(msg => {
                msg.delete(10000);
            });
            return;
        }
        let Extra = (words[2]);
        let bal = db.get(`{money}_${message.author.id}`);if (bal == null)bal = "0";
        if (Extra)return message.reply("Incorect command usage/arguments! Example: -pay @TheMLGDude#2177 10000");
        if (payment > db.get(`{money}_${message.author.id}`))return message.reply(`You don't have enough money to make a **$${payment}** payment. You only have **$${bal}**. You still need **$${payment-bal}**.`);

        db.subtract(`{money}_${message.author.id}`, payment);
        db.add(`{money}_${message.mentions.users.first().id}`, payment);
        message.channel.send(`Successfully took **$${payment}** from your account and payed ${message.mentions.users.first()} **$${payment}**! You now have **$${bal-payment}**.`);
    }
}

module.exports = PayCommand;