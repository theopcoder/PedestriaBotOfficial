const Commando = require("discord.js-commando"); //This dependency allows the use of commands. Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const discord = require("discord.js"); //This dependency allows the use of Discord features such as Embeds. Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help.
const db = require("quick.db"); //This dependency allows the use of sqlite database. Refer to https://quickdb.js.org/docs.html for help.
const BotData = require("./data.js"); //This imports custom error codes from data.js
const token = require("./Token"); //Importts the bot token from the Token.js file
const fs = require("fs"); //Imports modules to use read/write .jsons
const client = new discord.Client();

const bot = new Commando.Client({
    commandPrefix: "-"
});

bot.registry.registerGroup("admin", 'Admin');
bot.registry.registerGroup("economy", 'Economy');
bot.registry.registerGroup("simple", 'Simple');
bot.registry.registerGroup("staffsignup", 'StaffSignUp');
bot.registry.registerGroup("support", 'Support');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

const TOKEN = key;
bot.login(TOKEN);

bot.on('ready', function(){
    bot.user.setActivity("play.pedestriamc.com");//Use to be bot.user.setGame
    console.log(`Successfully signed into, ${bot.user.tag}`);
    console.log(`Running Version: ${Version}`);
});
//---------------------------------------------------------------------------------------------------------------------

//Settings check | Default bot settings
if (db.get("DeadChatMessage")== null)db.add("DeadChatMessage", 1);
if (db.get("closedrequests")== null)db.add("closedrequests", 0);
if (db.get("AutoModeration")== null)db.add("AutoModeration", 1);
if (db.get("MLS")== null)db.add("MLS", 1);

//Welcome message for new members
bot.on('guildMemberAdd', member => {
    const Welcomemsg = new discord.RichEmbed()
        .setColor("0x90ee90")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL)
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .addField("Information:", `
            :shopping_cart: https://store.pedestriamc.com/
            :globe_with_meridians: https://www.pedestriamc.com/
            :satellite: play.pedestriamc.com
        `)
        .addField("Welcome", "We hope you enjoy your stay! Make sure to read <#703833697153187840> and, <#704893263177580544>! Also, don't forget to check out our awesome Minecraft server! Sincerely, Pedestria Team")
    let logchannel = member.guild.channels.get('704876411177140364');
    return logchannel.send(Welcomemsg);
});

//Chat message/responses-Code for modules
bot.on('message', function(message){
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
    //Code for Modules
    if (db.get(`ping`)== 1){
        message.delete();
        db.subtract(`ping`, 1);
    }
});

//Auto Moderation
bot.on('message', function(message){
    if (db.get("AutoModeration")== 0){
        return;
    }else{
            //Chat Filter
            var profanities =                                                                                                                                                                                           ["bitch", "fuck", "shit", "sex", "porn", "dick", "penis", "scum", "cum"];
            let msg = message.content.toLowerCase();
            for (x = 0; x < profanities.length; x++){
            if (msg.includes(profanities[x])){
            message.delete();
            db.add(`{AMPSChatFilter}_${message.author.id}`, 1);
            const ChatFilterMessage = new discord.RichEmbed()
                .setColor("0xFFFF00")
                .setTimestamp()
                .setThumbnail(message.author.avatarURL)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle("Auto Moderation: Chat Filter")
                .setDescription(message.author+", Cursing is **NOT** allowed on this server!")
            message.channel.sendEmbed(ChatFilterMessage)
            .then(msg => {
                msg.delete(15000);
            });
        }
    }
    //Mute Bypass Protection (MBP)
    if (db.get(`{CurrentlyMuted}_${message.author.id}`)== 1){
        message.delete();
        let role = message.guild.roles.find(role => role.name === "Muted");
        if (role)
        message.member.addRole(role);
        db.add(`{MuteBypass}_${message.author.id}`, 1);

        let MuteBypassmsg = new discord.RichEmbed()
            .setColor("#4b5054")
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setTitle("Mute Bypass Protection")
            .addField("User:", message.author)
            .addField("Times Bypassed Mute:", db.get(`{MuteBypass}_${message.author.id}`))
        message.channel.sendEmbed(MuteBypassmsg);
    }
    }
});

//Dead Chat Messages (DCM)
bot.on('ready', () => {
    setInterval(() => {//BUG dcp goes off earlier then timed schedule causing multiple pings in the 6 hour waiting time
        if (db.get("DeadChatMessage")== 0)return;
        var PingChannel = bot.channels.get('704802753565949992');
        var DeadChatQuestion = Math.floor(Math.random() * 9);
        if (DeadChatQuestion == 0){DCQuestion = "Which is better? Java or Bedrock Minecraft?"};
        if (DeadChatQuestion == 1){DCQuestion = "Do you have a pre built or custom pc?"};
        if (DeadChatQuestion == 2){DCQuestion = "What's your favorite food?"};
        if (DeadChatQuestion == 3){DCQuestion = "Iphone or Android?"};
        if (DeadChatQuestion == 4){DCQuestion = "Do you have pets?"};
        if (DeadChatQuestion == 5){DCQuestion = "Whats your favorite console?"};
        if (DeadChatQuestion == 6){DCQuestion = "Survival or Creative?"};
        if (DeadChatQuestion == 7){DCQuestion = "Windows, Mac or Linux?"};
        if (DeadChatQuestion == 8){DCQuestion = "Airplane or Car?"};
        const DeadChatMessagePing = new discord.RichEmbed()
            .setTimestamp()
            .setColor("RANDOM")
            .setTitle("Dead Chat Ping!")
            .addField(DCQuestion, `<@&705577160328347658>`)
        PingChannel.sendEmbed(DeadChatMessagePing);

        db.add("ping", 1);
        PingChannel.send(`<@&705577160328347658>`);
    }, 1000 * 60 * 60 * 6);
});//1000(1 Second) * 60(60 Seconds) * 60(60 Minutes) * 6(6 Hours). The DCM goes off every 3 hours

//Message Level System (MLS)
bot.on('message', function(message){
    if (message.author.bot)return;
    if (db.get("MLS")== 0)return;
    db.add(`{xp}_${message.author.id}`, 1);

    if (db.get(`{xp}_${message.author.id}`)== 60){
        db.subtract(`{xp}_${message.author.id}`, 60);
        db.add(`{Level}_${message.author.id}`, 1);
        db.add(`{money}_${message.author.id}`, 200);
        const LevelUpmsg = new discord.RichEmbed()
            .setColor('0x0000FF')
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setTitle("Level Up!")
            .addField("User:", message.author)
            .addField("Level:", db.get(`{Level}_${message.author.id}`))
            .setFooter("You have recieved $200! Nice job!")
        let LevelUpChannel = message.guild.channels.get('746451871794724904');
        LevelUpChannel.send(LevelUpmsg);
    }
});
