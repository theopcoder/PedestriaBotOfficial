const BotConfiguration = require("./BotConfiguration.js");
const chalk = require("chalk");

var BotData = [
    BuildID = "2021.06.19.2.3.0",
    Version = "2.3.0",
    VN = "2.3.0 Fix Up",//VN stands for Version Name
    Developer = "theopcoder"
];

var Errors = [
    PermissionError = ":no_entry_sign: You have invalid permissions to perform this command!",
    StaffUser = ":warning: You can't perform this command on staff!",
    UserAlreadyUnmuted = ":warning: That user is already unmuted!",
    DMMessage = ":warning: You can't use this command in DM's!",
    UserAlreadyMuted = ":warning: That user is already muted!",
    NullUser = ":warning: User not found/mentioned!",
];

var RequiredField = "0";

//Required Fields
if (!BotPrefix){
    console.log(`⚠️: ${chalk.red(`BotPrefix is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!LogChannelID){
    console.log(`⚠️: ${chalk.red(`LogChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!MuteRoleID){
    console.log(`⚠️: ${chalk.red(`MuteRoleID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!ModLogID){
    console.log(`⚠️: ${chalk.red(`ModLogID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!MuteBypassProtectionSetting){
    console.log(`⚠️: ${chalk.red(`MuteBypassProtectionSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!DeletedMessagesSetting){
    console.log(`⚠️: ${chalk.red(`DeletedMessagesSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!DiscordInviteSetting){
    console.log(`⚠️: ${chalk.red(`DiscordInviteSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!ChatFilterSetting){
    console.log(`⚠️: ${chalk.red(`ChatFilterSetting is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!SuggestionChannelID){
    console.log(`⚠️: ${chalk.red(`SuggestionChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!BugReportChannelID){
    console.log(`⚠️: ${chalk.red(`BugReportChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!PollChannelID){
    console.log(`⚠️: ${chalk.red(`PollChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}
if (!WelcomeChannelID){
    console.log(`⚠️: ${chalk.red(`WelcomeChannelID is empty! This is a required field!`)}`);
    RequiredField = "1";
}

//Bot Shut off if required fields are left empty
if (RequiredField == "1"){
    console.log(chalk.green("You must fill in the required fields before the bot can turn on!"));
    process.exit();
}

//Recommended Fields
if (!DeletedMessageLogChannelID){
    console.log(`⚠️: ${chalk.yellow(`DeletedMessageLogChannelID is empty! Error's may occur if left empty!`)}`);
}
if (!LevelUpChannelID){
    console.log(`⚠️: ${chalk.yellow(`LevelUpChannelID is empty! Error's may occur if left empty!`)}`);
}
if (!LevelUpMoney){
    console.log(`⚠️: ${chalk.yellow(`LevelUpMoney is empty! Error's may occur if left empty!`)}`);
}
if (!XPToLevelUp){
    console.log(`⚠️: ${chalk.yellow(`XPToLevelUp is empty! Error's may occur if left empty!`)}`);
}
if (!MaxRandomXP){
    console.log(`⚠️: ${chalk.yellow(`MaxRandomXP is empty! Error's may occur if left empty!`)}`);
}
if (!DCPPingRoleID){
    console.log(`⚠️: ${chalk.yellow(`DCPPingRoleID is empty! Error's may occur if left empty!`)}`);
}
if (!DCPChannelID){
    console.log(`⚠️: ${chalk.yellow(`DCPChannelID is empty! Error's may occur if left empty!`)}`);
}
if (!DCPTime){
    console.log(`⚠️: ${chalk.yellow(`DCPTime is empty! Error's may occur if left empty!`)}`);
}
if (!NewMemberRoleID){
    console.log(`⚠️: ${chalk.yellow(`NewMemberRoleID is empty! Error's may occur if left empty!`)}`);
}

//Optional Fields
if (!ActivityMessage){
    console.log(`⚠️: ${chalk.blue(`ActivityMessage is empty. This is an optional field.`)}`);
}
if (!WelcomeMessage){
    console.log(`⚠️: ${chalk.blue(`WelcomeMessage is empty. This is an optional field.`)}`);
}
if (!SuggestionPingRoleID){
    console.log(`⚠️: ${chalk.blue(`SuggestionPingRoleID is empty. This is an optional field.`)}`);
}