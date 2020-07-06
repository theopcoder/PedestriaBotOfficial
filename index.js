const Commando = require('discord.js-commando'); //This dependency allows the use of commands. Refer to https://discord.js.org/#/docs/commando/master/general/welcome for help.
const discord = require('discord.js'); //This dependency allows the use of Discord features such as Embeds. Refer to https://discord.js.org/#/docs/main/stable/general/welcome for help.
const db = require('quick.db'); //This dependency allows the use of sqlite database. Refer to https://quickdb.js.org/docs.html for help.
const BotData = require("./data.js");//This imports custom error codes from errors.js
const token = require("./Token")
const client = new discord.Client();

const bot = new Commando.Client({
    commandPrefix: "-"
})

const TOKEN = key;

bot.registry.registerGroup("admin", 'Admin');
bot.registry.registerGroup("economy", 'Economy');
bot.registry.registerGroup("simple", 'Simple');
bot.registry.registerGroup("staffsignup", 'StaffSignUp');
bot.registry.registerGroup("support", 'Support');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready', function(){
    console.log(`Successfully signed into, ${bot.user.tag} Version: ${Version}!`);
    bot.user.setActivity("play.pedestriamc.com");//Use to be bot.user.setGame
});

bot.login(TOKEN);

bot.on('guildMemberAdd', member => {
    const Welcomemsg = new discord.RichEmbed()
        .setColor("0x90ee90")
        .setTimestamp()
        .setTitle(`Welcome to ${member.guild.name} ${member.user.tag}!`)
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
        message.reply("PlaceHolder:");
    }
    //Message responses
    if (message.content == "1234")
    {
        if (message.author.bot)return;
        message.reply("I declare a Ginger war!");
    }
    const BadWords =                                                                                                                                                                                                ["bitch", "fuck", "shit"];
    if( BadWords.some(word => message.content.includes(word))){ //Filter is on the right of this page. Don't scroll unless you are ok with seeing  curse words for the filter!
        if (message.author.bot)return;
        message.delete();
        message.channel.send(`No cursing is allowed ${message.author}! Make sure to follow <#703833697153187840>!`)
    }
});

bot.on('message', function(message){
    if (message.author.bot)return;
    if (db.get("MLS")== null)return;
    if (db.get("MLS")== 0)return;
    db.add(`{xp}_${message.author.id}`, 1)

    if (db.get(`{xp}_${message.author.id}`)== 5){
        db.subtract(`{xp}_${message.author.id}`, 5)
        db.add(`{Level}_${message.author.id}`, 1)
        message.channel.send("Congratulations, "+message.author+"! You are now Level, "+db.get(`{Level}_${message.author.id}`)+"!")
        return;
    }
});