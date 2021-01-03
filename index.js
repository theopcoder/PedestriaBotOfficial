const { CommandoClient } = require("discord.js-commando"); //Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const BotData = require("./BotData.js");//Imports custom BotData information for the bot.
const discord = require("discord.js"); //Refer to https://discord.js.org/#/docs/main/12.3.1/general/welcome for help.
const token = require("./Token.js"); //Imports the token key for the bot to launch.
const db = require("quick.db"); //Refer to https://quickdb.js.org/overview/docs for help.
const path = require("path");

const bot = new CommandoClient({
	commandPrefix: BotPrefix,
});

bot.registry
	.registerDefaultTypes()
	.registerGroups([
        ['admin', 'Admin'],
        ['economy', 'Economy'],
        ['other', 'Other'],
        ['simple', 'Simple'],
        ['support', 'Support'],
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
//End of command registration
bot.login(key);

bot.on('ready', function(){
    bot.user.setActivity(ActivityMessage);
    console.log(`Successfully Signed Into: ${bot.user.tag}`);
    console.log(`Bot Developer: ${Developer}`);
    console.log(`Running Version: ${Version}`);
});

//Default Bot Settings | Don't touch!
if (db.get("StaffApplicationsSetting")== null)db.add("StaffApplicationsSetting", StaffApplicationsSetting);
if (db.get("AutoModerationSetting")== null)db.add("AutoModerationSetting", AutoModerationSetting);
if (db.get("DeadChatPingSetting")== null)db.add("DeadChatPingSetting", DeadChatPingSetting);
if (db.get("LevelUpsSetting")== null)db.add("LevelUpsSetting", LevelUpsSetting);
//---------------------------------------------------------------------------

//New Members
bot.on('guildMemberAdd', member => {
    const NewMemberMessage = new discord.MessageEmbed()
        .setColor("#90ee90")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .addField("Information:", `
            :shopping_cart: https://store.pedestriamc.com/
            :globe_with_meridians: https://www.pedestriamc.com/
            :satellite: play.pedestriamc.com
        `)
        .addField("Welcome", "Don't forget to read <#703833697153187840> and <#704893263177580544>! Have fun!")
    let NewMemberChannel = member.guild.channels.cache.get(WelcomeChannelID);
    NewMemberChannel.send(NewMemberMessage);

    let MemberRole = member.guild.roles.cache.get(NewMemberRoleID);
    member.roles.add(MemberRole);
});

//Message Responses
bot.on('message', function(message){
    //Delete DeadChatPing message
    if (db.get("ping")== 1){
        message.delete();
        return;
    }
    //Auto Data Transfer
    if (db.get(`${message.author.id}.DataTransferComplete`)== null){
        if(message.author.bot)return;
        let RepP = db.get(`{reputation}_${message.author.id}`); if (RepP == null)RepP = "0";
        let Level = db.get(`{Level}_${message.author.id}`); if (Level == null)Level = "0";
        let Money = db.get(`{money}_${message.author.id}`); if (Money == null)Money = "0";
        let WarnP = db.get(`{warnp}_${message.author.id}`); if (WarnP == null)WarnP = "0";
        let MuteP = db.get(`{mutep}_${message.author.id}`); if (MuteP == null)MuteP = "0";
        let KickP = db.get(`{kickp}_${message.author.id}`); if (KickP == null)KickP = "0";
        let BanP = db.get(`{banp}_${message.author.id}`); if (BanP == null)BanP = "0";
		let XP = db.get(`{xp}_${message.author.id}`); if (XP == null)XP = "0";
	
		db.add(`${message.author.id}.admin.Violations`, RepP);
		db.add(`${message.author.id}.admin.Warnings`, WarnP);
		db.add(`${message.author.id}.admin.Kicks`, KickP);
		db.add(`${message.author.id}.admin.Mutes`, MuteP);
		db.add(`${message.author.id}.basic.level`, Level);
		db.add(`${message.author.id}.basic.money`, Money);
		db.add(`${message.author.id}.admin.Bans`, BanP);
		db.add(`${message.author.id}.basic.xp`, XP);

		db.add(`${message.author.id}.DataTransferComplete`, 1);
    }
    //Random XP for Level Ups
    if(db.get("LevelUpsSetting")== 0){
        return;
    }else{
        if (message.author.bot)return;
        if (message.guild === null)return;
        var RandomXP = Math.floor(Math.random() * MaxRandomXP);
        db.add(`${message.author.id}.basic.xp`, RandomXP);
    }
    //Level Up System
    if (db.get(`${message.author.id}.basic.xp`) > MaxXP){
        if (message.author.bot)return;
        db.delete(`${message.author.id}.basic.xp`);
        db.add(`${message.author.id}.basic.level`, 1);
        db.add(`${message.author.id}.basic.money`, LevelUpMoney);

        const LevelUpMessage = new discord.MessageEmbed()
            .setColor('0x0000FF')
            .setTimestamp()
            .setThumbnail(message.author.avatarURL())
            .setTitle(":tada: Level Up!")
            .setDescription(`
                **User:** ${message.author}
                **Level:** ${db.get(`${message.author.id}.basic.level`)}
            `)
            .setFooter(`You have recieved $${LevelUpMoney}! Nice job!`)
        let LevelUpChannel = message.guild.channels.cache.get(LevelUpChannelID);
        LevelUpChannel.send(LevelUpMessage);
    }
    
    if (message.content == "1234"){
        if (message.author.bot)return;
        message.reply("I declare a Ginger war!");
    }
    if (message.content == "4321"){
        if (message.author.bot)return;
        message.reply("Are you sure about that?");
    }
    if (message.content == "pizza"){
        if (message.author.bot)return;
        message.reply("Can I have a slice of pizza? Please?");
    }
});

//Auto Moderation
bot.on('message', function(message){
    if (db.get(`AutoModerationSetting`)== 0){
        return;
    }else{
        if (message.guild === null)return;
        if (message.author.bot)return;
        //Mute Bypass Protection
        if (MuteBypassProtectionSetting == "1"){
            if (db.get(`${message.author.id}.admin.CurrentlyMuted`)== 1){
                message.delete();
                db.add(`${message.author.id}.admin.TimesBypassedMute`, 1);
                let MuteRole = message.guild.roles.cache.get(MuteRoleID);
                message.member.roles.add(MuteRole);
    
                const MuteBypassMessage = new discord.MessageEmbed()
                    .setColor("#4b5054")
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTitle("Mute Bypass")
                    .setDescription(`
                        **User:** ${message.author}
                        **Time Bypassed Mute:** ${db.get(`${message.author.id}.admin.TimesBypassedMute`)}
                    `)
                message.channel.send(MuteBypassMessage);
            }
        }else{
            return;
        }
        //Chat Filter
        if (ChatFilterSetting == "1"){
            var profanities =                                                                                                                                                                                           ["bitch", "fuck", "shit", "sex", "porn", "dick", "penis", "faggot", "cum", "arse", "ass", "bastard", "bollocks", "bugger", "bullshit", "nigga", "nigger", "crap", "piss", "shitass", "whore", "slut", "prostitute", "motherfucker", "frigger", "prick", "dick", "cuck", "wank", "wanker", "shag"];
            let msg = message.content.toLowerCase();
            for (x = 0; x < profanities.length; x++){
                if (msg.includes(profanities[x])){
                    message.delete();
                    db.add(`{AMPSChatFilter}_${message.author.id}`, 1);
                    const ChatFilterMessage = new discord.MessageEmbed()
                        .setColor("0xFFFF00")
                        .setTimestamp()
                        .setThumbnail(message.author.displayAvatarURL())
                        .setAuthor(message.author.tag, message.author.displayAvatarURL())
                        .setTitle("Auto Moderation: Chat Filter")
                        .setDescription(`${message.author}, cursing is **NOT** allowed on this server!`)
                    message.channel.send(ChatFilterMessage).then(message => {
                        message.delete({timeout: 15000});
                    });
                }
            }
        }else{
            return;
        }
        //Discord Invite Checker
        if (DiscordInviteSetting == "1"){
            if (message.content.includes('discord.gg/'||'discordapp.com/invite/')){
                message.delete();
                const DiscordInviteWarning = new discord.MessageEmbed()
                    .setThumbnail(message.author.displayAvatarURL())
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setTitle("No Discord Invites")
                    .setDescription(`${message.author} Discord invites aren't allowed here!`)
                message.channel.send(DiscordInviteWarning);
            }
        }else{
            return;
        }
    }
});

//Deleted Messages
bot.on('messageDelete', async (message) => {
    if (db.get("AutoModerationSetting")== 0){
        return;
    }else{
        if (message.guild === null)return;
        if (DeletedMessagesSetting == "1"){
            let logs = await message.guild.fetchAuditLogs({type: 72});
            let entry = logs.entries.first();
    
            const DeletedMessageLog = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("#fc3c3c")
                .setThumbnail(entry.executor.displayAvatarURL())
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle("Deleted Message")
                .setDescription(`
                    **Executor:** ${entry.executor}
                    **Author:** ${message.author}
                    **Channel:** ${message.channel}
                    **Message:** ${message.content}
                `)
                .setFooter(`Message ID: ${message.id}\nAuthor ID: ${message.author.id}`)
            let DeletedMessageLogChannel = message.guild.channels.cache.get(DeletedMessageLogChannelID);
            DeletedMessageLogChannel.send(DeletedMessageLog);
        }else{
            return;
        }
    }
});

//Dead Chat Pings
bot.on('ready', () => {
    setInterval(() => {
        if (db.get("DeadChatPingSetting")== 0){
            return;
        }else{
            var PingChannel = bot.channels.cache.get(DCPPingChannelID);
            var DeadChatQuestion = Math.round(Math.random() * 31);
            if (DeadChatQuestion == 0){DCPQuestion = "What is the most valuable thing you currently have ingame?"};
            if (DeadChatQuestion == 1){DCPQuestion = "What movie or book character do you most identify with?"};
            if (DeadChatQuestion == 2){DCPQuestion = "As a child, what did you wish to be when you grew up?"};
            if (DeadChatQuestion == 3){DCPQuestion = "Are we seeing signs of evolution in our species?"};
            if (DeadChatQuestion == 4){DCPQuestion = "What are you currently working on in Survival?"};
	        if (DeadChatQuestion == 5){DCPQuestion = "Why is science so important to modern society?"};
            if (DeadChatQuestion == 6){DCPQuestion = "What are you currently working on in WarLands?"};
            if (DeadChatQuestion == 7){DCPQuestion = "What is your favorite form of transportation?"};
            if (DeadChatQuestion == 8){DCPQuestion = "What's the worst thing you ever did as a kid?"};
            if (DeadChatQuestion == 9){DCPQuestion = "What trait do you like most about yourself?"};
            if (DeadChatQuestion == 10){DCPQuestion = "What is your favorite version of Minecraft?"};
            if (DeadChatQuestion == 11){DCPQuestion = "Is time relative to a person or universal?"};
	        if (DeadChatQuestion == 12){DCPQuestion = "What song always puts you in a good mood?"};
            if (DeadChatQuestion == 13){DCPQuestion = "What's the weirdest quirk you find funny?"};
            if (DeadChatQuestion == 14){DCPQuestion = "Survival, Creative or Hardcore Minecraft?"};
            if (DeadChatQuestion == 15){DCPQuestion = "What do you like to do on the weekends?"};
            if (DeadChatQuestion == 16){DCPQuestion = "Would you say you make friends easily?"};
            if (DeadChatQuestion == 17){DCPQuestion = "What do you like to do on a rainy day?"};
            if (DeadChatQuestion == 18){DCPQuestion = "What's your favourite type of music?"};
            if (DeadChatQuestion == 19){DCPQuestion = "What is your favourite Disney movie?"};
            if (DeadChatQuestion == 20){DCPQuestion = "What's your favorite activity?"};
            if (DeadChatQuestion == 21){DCPQuestion = "Laptop, Desktop or Handheld?"};
            if (DeadChatQuestion == 22){DCPQuestion = "What's your favorite food?"};
            if (DeadChatQuestion == 23){DCPQuestion = "Java or Bedrock Minecraft?"};
            if (DeadChatQuestion == 24){DCPQuestion = "What's your first memory?"};
            if (DeadChatQuestion == 25){DCPQuestion = "Windows, MacOS or Linux?"};
            if (DeadChatQuestion == 26){DCPQuestion = "Playstation Or Xbox?"};
            if (DeadChatQuestion == 27){DCPQuestion = "How have you been?"};
            if (DeadChatQuestion == 28){DCPQuestion = "Iphone or Android?"};
            if (DeadChatQuestion == 29){DCPQuestion = "Do you have pets?"};
            if (DeadChatQuestion == 30){DCPQuestion = "Airplane or Car?"};

            const DeadChatPing = new discord.MessageEmbed()
                .setTimestamp()
                .setColor("RANDOM")
                .setTitle("Dead Chat Ping!")
                .addField(DCPQuestion, `<@&${DCPPingRoleID}>`)
            PingChannel.send(DeadChatPing);

            db.add("ping", 1);
            PingChannel.send(`<@&${DCPPingRoleID}>`);
        }
    }, 1000 * 60 * 60 * DCPTime);
});