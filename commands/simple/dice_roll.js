const Commando = require("discord.js-commando");

class RollCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "roll",
            group: "simple",
            memberName: 'roll',
            description: 'Rolls a 6 sided dice.'
        });
    }

    async run(message, args)
    {
        {
            var diceRoll = Math.floor(Math.random() * 6) + 1;
            message.reply("Your Dice landed on " +diceRoll);
         }
    }
}

module.exports = RollCommand;