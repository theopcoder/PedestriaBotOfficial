const Commando = require("discord.js-commando");
const discord = require("discord.js");
const db = require("quick.db");
const BotData = require("../../data.js")

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
        let words = args.split(' ');
        let reason = words.slice(0).join(' ');
        /*if (!reason) return message.reply(':warning: Reason needed!')
        .then(msg => {
            msg.delete(10000)
        });*/
        if(!message.member.roles.find(r => r.name === "Bot Dev")) {
            message.reply("You do not have permission to access this command! If you believe this is a mistake, please contact the bot owner!");
            return;
        }
        //message.channel.send("Placeholder:");
        /*message.channel.send("Starting Bot Diagnostics...")
        if (db.get("MLS")== null){
            var MLS = "Broken"
        }else{
            MLS = "Working!";
        }
        setTimeout(function(){
            message.channel.send(MLS)
        })*/
        const fs = require('fs');

        /*let rawdata = fs.readFileSync('student.json');
        let student = JSON.parse(rawdata).name;
        console.log(student);*/
        fs.readFile('student.json', (err, data) => {
            if (err) throw err;
            let student = JSON.parse(data).name;
            //console.log(student);
            if (student == "Sara"){
                console.log("The check works!")
                console.log(student)
            }else{
                console.log("There name is NOT Sara!")
            }
        });

        let meep = message.author
        let student = { 
            "name": {meep},
            age: 23, 
            gender: 'Male',
            department: 'English',
            car: 'Honda' 
        };

        let data = JSON.stringify(student, null, 2);
        fs.writeFile('student-3.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
        
        console.log('This is after the read call');
        //console.log(JSON.parse(jsonData).name);
    }
}

module.exports = TestCommand;