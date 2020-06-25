const Commando = require("discord.js-commando");
const Errors = require("../../errors");

class TestCommand extends Commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "tc",
            group: "simple",
            memberName: 'tc',
            description: 'A test command for the bot devloper!'
        });
    }

    async run(message, args)
    {
        if(!message.member.roles.find(r => r.name === "Bot Dev")) {
            message.reply("You do not have permission to access this command! If you believe this is a mistake, please contact the bot owner!");
            return;
        }
        message.channel.send("Placeholder:")
    }
}

module.exports = TestCommand;