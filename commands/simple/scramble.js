const { Command } = require('discord.js-commando');
const BotData = require("../../BotData.js");
const discord = require("discord.js");
const db = require("quick.db");

module.exports = class cubeScrambleCommand extends Command {
constructor(client) {
  super(client, {
    name: 'scramble',
    group: 'simple',
    memberName: 'scramble',
    description: 'Scrambles a 3x3x3 Rubik\'s Cube!',
  });
}

 run(message, args) {
 let words = args.split(' ');
 let reason = words.slice(0).join(' ');
  if (reason == "help") {
    const CubeScrambleHelp = new discord.MessageEmbed()
      .setTimestamp()
      .setColor("RANDOM")
      .setTitle("Cube Scramble Help")
      .setDescription(`
        **Usage:**
          a. -scramble <3|help>
          \taa. 3: Scrambles a 3x3!
          \tab. help: Shows this menu!
      `)
    message.channel.send(CubeScrambleHelp);
  } else if (reason == "") {
    const CubeScrambleHelp = new discord.MessageEmbed()
      .setTimestamp()
      .setColor("RANDOM")
      .setTitle("Cube Scramble Help")
      .setDescription(`
        **Usage:**
          a. -scramble <3|help>
          \taa. 3: Scrambles a 3x3!
          \tab. help: Shows this menu!
      `)
    message.channel.send(CubeScrambleHelp);
  } else if (reason == "3") {
    var timesLooped = 0;
    
    var moveOne;
    var moveTwo;
    var moveThree;
    var moveFour;
    var moveFive;
    var moveSix;
    var moveSeven;
    var moveEight;
    var moveNine;
    var moveTen;
    var moveEleven;
    var moveTwelve;
    var moveThirteen;
    var moveFourteen;
    var moveFifteen;
    var moveSixteen;
    var moveSeventeen;
    var moveEighteen;
    var moveNineteen;
    var moveTwenty;
    var moveTwentyOne;
    var moveTwentyTwo;
    var moveTwentyThree;
    
    while (timesLooped != 24) {
      var notation = "undef";
      var cubeScramble = Math.floor(Math.random() * 18) + 1;

      if (cubeScramble == 1) {
        notation = "R";
      } else if (cubeScramble == 2) {
        notation = "R'";
      } else if (cubeScramble == 3) {
        notation = "R2";
      } else if (cubeScramble == 4) {
        notation = "U";
      } else if (cubeScramble == 5) {
        notation = "U'";
      } else if (cubeScramble == 6) {
        notation = "U2";
      } else if (cubeScramble == 7) {
        notation = "F";
      } else if (cubeScramble == 8) {
        notation = "F'";
      } else if (cubeScramble == 9) {
        notation = "F2";
      } else if (cubeScramble == 10) {
        notation = "L";
      } else if (cubeScramble == 11) {
        notation = "L'";
      } else if (cubeScramble == 12) {
        notation = "L2";
      } else if (cubeScramble == 13) {
        notation = "D";
      } else if (cubeScramble == 14) {
        notation = "D'";
      } else if (cubeScramble == 15) {
        notation = "D2";
      } else if (cubeScramble == 16) {
        notation = "B";
      } else if (cubeScramble == 17) {
        notation = "B'";
      } else if (cubeScramble == 18) {
        notation = "B2";
      }
      
      if (timesLooped === 1) {
        moveOne = notation;
      } else if (timesLooped == 2) {
        moveTwo = notation;
      } else if (timesLooped == 3) {
        moveThree = notation;
      } else if (timesLooped == 4) {
        moveFour = notation;
      } else if (timesLooped == 5) {
        moveFive = notation;
      } else if (timesLooped == 6) {
        moveSix = notation;
      } else if (timesLooped == 7) {
        moveSeven = notation;
      } else if (timesLooped == 8) {
        moveEight = notation;
      } else if (timesLooped == 9) {
        moveNine = notation;
      } else if (timesLooped == 10) {
        moveTen = notation;
      } else if (timesLooped == 11) {
        moveEleven = notation;
      } else if (timesLooped == 12) {
        moveTwelve = notation;
      } else if (timesLooped == 13) {
        moveThirteen = notation;
      } else if (timesLooped == 14) {
        moveFourteen = notation;
      } else if (timesLooped == 15) {
        moveFifteen = notation;
      } else if (timesLooped == 16) {
        moveSixteen = notation;
      } else if (timesLooped == 17) {
        moveSeventeen = notation;
      } else if (timesLooped == 18) {
        moveEighteen = notation;
      } else if (timesLooped == 19) {
        moveNineteen = notation;
      } else if (timesLooped == 20) {
        moveTwenty = notation;
      } else if (timesLooped == 21) {
        moveTwentyOne = notation;
      } else if (timesLooped == 22) {
        moveTwentyTwo = notation;
      } else if (timesLooped == 23) {
        moveTwentyThree = notation;
      }
      
      timesLooped++;
    }
    const Scramble3 = new discord.MessageEmbed()
      .setTimestamp()
      .setColor("RANDOM")
      .setTitle("Scramble")
      .setDescription(
        moveOne + ` ` + moveTwo + ` ` + moveThree + ` ` + moveFour + ` ` + moveFive + ` ` + moveSix + ` ` + moveSeven + ` ` + moveEight + ` ` + moveNine + ` ` + moveTen + ` ` + moveEleven + ` ` + moveTwelve + ` ` + moveThirteen + ` ` + moveFourteen + ` ` + moveFifteen + ` ` + moveSixteen + ` ` + moveSeventeen + ` ` + moveEighteen + ` ` + moveNineteen + ` ` + moveTwenty + ` ` + moveTwentyOne + ` ` + moveTwentyTwo + ` ` + moveTwentyThree
      )
      message.channel.send(Scramble3);
    }
  }
}