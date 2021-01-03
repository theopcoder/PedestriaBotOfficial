const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class PollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'poll',
			group: 'support',
			memberName: 'poll',
            description: `Creates a poll`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        if(!message.member.hasPermission("ADMINISTRATOR")){
			const PermissionErrorMessage = new discord.MessageEmbed()
				.setColor("#FF0000")
				.setDescription(`${PermissionError}`)
			message.channel.send(PermissionErrorMessage).then(message => {
				message.delete({timeout: 10000})
			});
			return;
        }
        let words = args.split(' ');
        let Poll = words.slice(1).join(' ');
        
        const PollMessage = new discord.MessageEmbed()
            .setTimestamp()
            .setColor("#0000FF")
            .setThumbnail(message.author.displayAvatarURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle("Poll")
            .setDescription(`
                User: ${message.author}
                Poll: ${Poll}
            `)
        let PollChannel = message.guild.channels.cache.get(PollChannelID);
        PollChannel.send(PollMessage).then(MessageEmbed => {
            MessageEmbed.react("✅");
            MessageEmbed.react("❌");
        });
	}
};