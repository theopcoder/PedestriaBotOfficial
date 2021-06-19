const { Command } = require("discord.js-commando");
const BotData = require("../../System.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class SuggestCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'suggest',
			group: 'support',
			memberName: 'suggest',
			description: `Allows you to send suggestions!`,
		});
	}

	run(message, args) {
        if (message.guild === null){
            message.reply(DMMessage);
            return;
        }
        message.delete();
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        if (!reason)return message.reply(":warning: Incomplete command! What's your suggestion?").then(message => {
            message.delete({timeout: 10000});
        });
        db.add("SuggestionNumber", 1);

        const SuggestionMessage = new discord.MessageEmbed()
            .setColor("#20B2AA")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setTitle(`Suggestion #${db.get("SuggestionNumber")}`)
            .setDescription(`
                **User:** ${message.author}
                **Suggestion:** ${reason}
            `)
        let SuggestionChannel = message.guild.channels.cache.get(SuggestionChannelID);
        SuggestionChannel.send(SuggestionMessage).then(MessageEmbed => {
            MessageEmbed.react("✅");
            MessageEmbed.react("🤷");
            MessageEmbed.react("❌");
        });

        if (SuggestionPingRoleID == null){
            return;
        }else{
            SuggestionChannel.send(`<@&${SuggestionPingRoleID}>, New suggestion!`).then(message => {
                message.delete();
            });
        }

        message.reply("Successfully sent your suggestion!").then(message => {
            message.delete({timeout: 10000});
        });
	}
};