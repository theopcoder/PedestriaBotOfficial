const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TemperatureCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'temperature',
			group: 'fun',
			memberName: 'temperature',
			description: 'Converts the temperature from F or C!',
		});
	}

	run(message, args) {
		let words = args.split(' ');
        let type = words.slice(1).join(' ');

        if (!words[0]){
            const NoTemp = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`
                What's the number you want to convert?
                Correct Usage: -temperature <number> <F/C>`)
            message.channel.send(NoTemp);
            return;
        }
        if (isNaN(words[0])){
            const IncorrectNumber = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`
                You must use a number!
                Correct Usage: -temperature <number> <F/C>`)
            message.channel.send(IncorrectNumber);
            return;
        }
        if (!type){
            const NoConversion = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`
                Do you want to convert to F or C?
                Correct Usage: -temperature <number> <F/C>`)
            message.channel.send(NoConversion);
            return;
        }

        if (type == "f"){
            var f = words[0];
            var c = (words[0]-32)*5/9;
            var title = "Fahrenheit to Celsius"
            var color = "ORANGE";
        }
        if (type == "c"){
            var c = words[0];
            var f = (words[0]*9/5)+32;
            var title = "Celsius to Fahrenheit";
            var color = "YELLOW";
        }

        const TempConversion = new discord.MessageEmbed()
            .setColor(color)
            .setTitle(title)
            .setDescription(`
                **Fahrenheit:** ${f}°F
                **Celsius:** ${c}°C
            `)
        message.channel.send(TempConversion);
	}
};