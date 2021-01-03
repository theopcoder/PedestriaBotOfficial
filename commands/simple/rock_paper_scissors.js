const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class RPSCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rps',
			group: 'simple',
			memberName: 'rps',
			description: 'Plays rock, paper, scissors!',
		});
	}

	run(message, args) {
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        if (reason == "help"){
            const RPSRules = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#008000")
                .setTitle("Rock Paper Scissor Rules-Options")
                .setDescription(`
                    **Normal:**
                        a. Command usage: -rps normal
                        b. This will let you play a normal round of rock, paper, scissors
                    **Lizards:**
                        a. Command usage -rps
                        b. No special words needed
                        c. This will allow you to play a customized version of rock paper scissors
                        d. Rules: Scissors cuts paper, paper covers rock, rock crushes lizard, lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard, lizard eats paper, paper disproves Spock, Spock vaporizes rock, and as it always has, rock crushes scissors

                `)
            message.channel.send(RPSRules);
        }
        if (reason == "normal"){
            var chance = Math.floor(Math.random() * 3);
            if (chance == 0){
                return message.reply("I got rock");
            }
            if(chance == 1){
                return message.reply("I got paper");
            }
            if (chance == 2){
                return message.reply("I got scissors");
            }
        }else{
            var chance = Math.floor(Math.random() * 5);
            if (chance == 0){
                return message.reply("I got rock");
            }
            if(chance == 1){
                return message.reply("I got paper");
            }
            if (chance == 2){
                return message.reply("I got scissors");
            }
            if (chance == 3){
                return message.reply("I got lizard");
            }
            if (chance == 4){
                return message.reply("I got spock");
            }
        }
	}
};