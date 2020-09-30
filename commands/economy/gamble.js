const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js");

class GambleCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "gamble",
            group: "economy",
            memberName: 'gamble',
            description: 'Lets you gamble with your money'
        });
    }

    async run(message, args)
    {
        if (message.guild === null){
            message.reply(DMMessage)
            return;
        }
        let words = args.split(' ');
        let bet = words.slice(0).join(' ');
        let Extra = words.slice(1).join(' ');
        let bal = db.get(`{money}_${message.author.id}`); if (bal == null)bal = "0";

        if (isNaN(args[0])){
            message.reply("There where invalid charectors for the bet! Please make sure the bet is only numbers! Thank you!")
            .then(msg => {
                msg.delete(10000)
            });
            return;
        }
        if (Extra)return message.reply("Incorect command usage/arguments! Example: -gamble 1500");
        if (!bet) return message.reply(':warning: You must bet atleast $1000 to use this command!')
        .then(msg => {
            msg.delete(10000);
        });
        if (bet < 1000)return message.channel.send(`I'm sorry ${message.author}, you have to bet **$1000** or more to use this command!`);
        if (bet > bal)return message.channel.send(`I'm sorry ${message.author}, You don't have enough money to make a $**${bet}** bet. You only have $**${bal}**!`);
        db.subtract(`{money}_${message.author.id}`, bet);
        var GambleBet = Math.floor(Math.random() * 25);
        var Compare = Math.floor(Math.random() * 25);
        if (GambleBet == Compare){
            var Win = Math.floor(Math.random() * 3000);
            db.add(`{money}_${message.author.id}`, Win)
            if (Win < bet)return message.channel.send(`Congradulations ${message.author}! You just won **$${Win}** but you still lost **$${bet-Win}**. :face_with_monocle:`);
            if (Win == bet)return message.channel.send(`Congradulations ${message.author}! You got your **$${bet}** back! :dollar:`);
            message.channel.send(`Congradulations ${message.author}! You just won **$${Win}**! :money_with_wings:`);
        }else{
            let NewBal = db.get(`{money}_${message.author.id}`); if (NewBal == null)NewBal = "0";
            if (NewBal > 1000){
                message.reply(`Better luck next time. Why not try again? You still have **$${NewBal}**!`);
            }else{
                message.reply("You lost. Better luck next time!");
            }
        }
    }
}

module.exports = GambleCommand;