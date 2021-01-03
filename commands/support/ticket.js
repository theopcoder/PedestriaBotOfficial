const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class TicketCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ticket',
			group: 'support',
			memberName: 'ticket',
			description: `Allows you to send suggestions!`,
		});
	}

	run(message, args) {//TODO Finish ticket.js
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        message.delete();
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');

        if (!reason)return message.reply(":warning: Incomplete command! What's the issue?").then(message => {
            message.delete({timeout: 10000});
        });

        let category = message.member.guild.channels.cache.find(c => c.id == `${TicketCategoryID}` && c.type == "category");

        /*if (reason == "close"){
            let TicketLogChannel = message.guild.channels.cache.get(TicketLogChannelID);

            if (message.channel.id === "794459983470657536"){
                message.reply("Closing ticket!");
                message.channel.delete();
                return TicketLogChannel.send(`${channel.name} was deleted!`);
            }else{
                return message.reply(":warning: This is not a ticket!");
            }
        }*/

        db.add("TicketNumber", 1);
        message.member.guild.channels.create(`Ticket-${db.get("TicketNumber")}`).then(channel => {
            if (!category)return message.channel.send(":warning: Ticket category channel does not exist!");
            channel.setParent(category.id);

            const NewTicketMessage = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#b83814")
                .setThumbnail(message.author.displayAvatarURL())
                .setTitle("Ticket")
                .setDescription(`
                    **User:** ${message.author}
                    **Report:** ${reason}

                    While you wait, please describe your issue! Staff will be with you soon!
                `)
            channel.send(NewTicketMessage);
            channel.send(`<@&${TicketStaffPingRoleID}>`).then(message => {
                message.delete();
            });
        }).catch(console.error);
	}
};