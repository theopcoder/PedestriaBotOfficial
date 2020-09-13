const Commando = require("discord.js-commando"); //This dependency allows the use of commands. Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const discord = require("discord.js"); //This dependency allows the use of Discord features such as Embeds. Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help.
const db = require("quick.db"); //This dependency allows the use of sqlite database. Refer to https://quickdb.js.org/docs.html for help.
const BotData = require("./data.js"); //This imports custom error codes from data.js
const token = require("./Token");
const fs = require('fs');
const client = new discord.Client();

const bot = new Commando.Client({
    commandPrefix: "-"
});

const TOKEN = key;

bot.registry.registerGroup("admin", 'Admin');
bot.registry.registerGroup("economy", 'Economy');
bot.registry.registerGroup("simple", 'Simple');
bot.registry.registerGroup("staffsignup", 'StaffSignUp');
bot.registry.registerGroup("support", 'Support');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

//TODO Replace db null checks with json settings
//if (db.get("Lol")== null)db.add("Lol", 1);//TODO add a null check for settings

bot.on('ready', function(){
    console.log(`Successfully signed into, ${bot.user.tag}`);
    console.log(`Version: ${Version}`);
    bot.user.setActivity("play.pedestriamc.com");//Use to be bot.user.setGame
});

bot.login(TOKEN);

bot.on('guildMemberAdd', member => {
    const Welcomemsg = new discord.RichEmbed()
        .setColor("0x90ee90")
        .setTimestamp()
        .setTitle(`Welcome to ${member.guild.name}, ${member.user.tag}!`)
        .addField("Information:", 
        `
        :shopping_cart: https://store.pedestriamc.com/
        :globe_with_meridians: https://www.pedestriamc.com/
        :satellite: play.pedestriamc.com
        `)
        .addField("Welcome", "We hope you enjoy your stay! Make sure to read <#703833697153187840> and, <#704893263177580544>! Also, don't forget to check out our awesome Minecraft server! Sincerely, Pedestria Team")
    let logchannel = member.guild.channels.get('704876411177140364'); 
    return logchannel.send(Welcomemsg);
});

bot.on('message', function(message){
    //BotDev commands/features
    if (message.content == "test")
    {
        if (message.author.bot)return;
        if(!message.member.roles.find(r => r.name === "Bot Dev")){
            message.reply(Error5);
            return;
        }
        message.reply("Null:")
    }
    //Message responses
    if (message.content == "1234")
    {
        if (message.author.bot)return;
        message.reply("I declare a Ginger war!");
    }
});

//Auto Chat Moderation
bot.on('message', function(message){
    //Chat Filter
    //TODO add infractions so after so many warns, it auto mutes
    var profanities =                                                                                                                                                                                                                                                ["fish", "bitch", "fuck", "shit", "sex", "porn"];
    let msg = message.content.toLowerCase();
    for (x = 0; x < profanities.length; x++){
        if (msg.includes(profanities[x])){
            message.delete()
            db.add(`{AMPSChatFilter}_${message.author.id}`, 1)
            const ChatFilterMessage = new discord.RichEmbed()
                .setColor("0xFFFF00")
                .setTimestamp()
                .setThumbnail(message.author.avatarURL)
                .setAuthor(message.author.tag, message.author.avatarURL)
                .setTitle("Auto Moderation: Chat Filter")
                .setDescription(message.author+", Cursing is **NOT** allowed on this server!")
            message.channel.sendEmbed(ChatFilterMessage)
            .then(msg => {
                msg.delete(15000)
            });  
        }
    }
    //TODO fix mute bypass protection system
    //Mute Bypass Protection
    /*if (db.get(`{CurrentlyMuted}_${message.author.id}`)== 1)
    {
        message.delete()
        let role = message.guild.roles.find(role => role.name === "Muted");
        if (role) 
        message.member.addRole(role)
        db.add(`{AMPSMuteBypass}_${message.author.id}`, 1);

        let MuteBypassCheckmsg = db.get(`{AMPSMuteBypass}_${message.author.id}`);
        const MuteBypassProtection = new discord.RichEmbed()
            .setColor(0x668d3c)
            .setThumbnail(message.author.avatarURL)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("Auto Moderation: Mute Bypass")
            .addField("User:", message.author)
            .addField("Times Bypassed Mute:", MuteBypassCheckmsg)
            .addField("What is this?", "If you are seeing this, that means you have managed to bypass your mute! You have been automatically remuted!")
        message.channel.sendEmbed(MuteBypassProtection);
    }*/
});

//DeadChatMessage(DCM)
bot.on('ready', () => {
    setInterval(() => {
        if (db.get("DeadChatMessage")== 0){
            return;
        }else{
            var DeadMessageChannel = bot.channels.get('749157365340831794');
            const DeadMSG = new discord.RichEmbed()
                .setTimestamp()
                .setColor("RANDOM")
                .setTitle("Dead Chat Ping!")
                .addField("<@&705577160328347658> Haha! You got pinged!", "Do you have custom built or prebuilt computers?")
            DeadMessageChannel.sendEmbed(DeadMSG)
        }
    }, 1000 * 60 * 60 * 3);
});//1000(1 Second) * 60(60 Seconds) * 60(60 Minutes) * 3(3 Hours). The DCM goes off every 3 hours

bot.on('message', function(message){
    if (message.author.bot)return;
    if (db.get("MLS")== null)return;
    if (db.get("MLS")== 0)return;
    db.add(`{xp}_${message.author.id}`, 1)

    if (db.get(`{xp}_${message.author.id}`)== 60){
        db.subtract(`{xp}_${message.author.id}`, 60)
        db.add(`{Level}_${message.author.id}`, 1)
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