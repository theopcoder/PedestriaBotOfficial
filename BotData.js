var BotData = [
    Version = "2.1.0",
    VN = "2.1.0 Bot Updates",//VN stands for Version Name
    Developer = "TheMLGDude#2177 | theopcoder",
    DeveloperDiscord = "TheMLGDude#2177",
    DeveloperGitHub = "theopcoder",
];

var DevPromt = [
    DevWarning = ":warning: You are attempting to access developer features that can cause damage! Proceed with caution!",
    DevAccess = "**:no_entry_sign:** Access Denied! :no_entry_sign:",
];

var Errors = [
    Error6 = "**:warning: Error 6:** ```Invalid description or argument detected! Try making sure the command is being performed right and try again!```",
    Error4 = "**:warning: Error 4:** ```This command/feature has not yet been implemented yet! Please check back in the next bot update! Thank you!```",
    Error2 = "**:shield: Error 2:** Outdated bot version! Please update to the new Bot Version for the latest features, commands and security fixes!",
    Error3 = "**:warning: Error 3:** ```Sorry, this command/feature hasn't been implemented yet! Check back in future updates!```",
    Error5 = "**:no_entry_sign: Error 5:** You do NOT have the permission to perform this command/feature! :no_entry_sign:",
    Error7 = "**:warning: Error 7:** ```There was no description given! Please give a description or argument!```",
    StaffUser = ":no_entry_sign: Sorry, you can't perform this command on a staff member!",
    PermissionError = ":no_entry_sign: You don't have the correct permission!",
    UserAlreadyUnmuted = ":warning: That user is already unmuted!",
    DMMessage = ":warning: You can't use this command in DM's!",
    UserAlreadyUnBanned = ":warning: That user isn't banned! ",
    UserAlreadyMuted = ":warning: That user is already muted!",
    NullUser = ":warning: Sorry, I couldn't find that user!",
    Error1 = "**:warning: Error 1:** You have no xp!",
];

var BotConfiguration = [
    //--------------------------------------------------
    //Bot Configuration---------------------------------
    BotPrefix = "-",
    ActivityMessage = "play.pedestriamc.com | Happy 2021!",
    StaffApplicationsSetting = "0",
    AutoModerationSetting = "1",
    DeadChatPingSetting = "1",
    LevelUpsSetting = "1",
    //--------------------------------------------------
    //Channel Configuration-----------------------------
    WelcomeChannelID = "704876411177140364",
    NewMemberRoleID = "738879347468795967",
    //--------------------------------------------------
    //Admin Configuration-------------------------------
    DeletedMessageLogChannelID = "740270992269639731",
    PurgeLogChannelID = "740270992269639731",
    LogChannelID = "740270992269639731",
    MuteRoleID = "790134169412829204",
    //--------------------------------------------------
    //Auto Moderation Configuration---------------------
    MuteBypassProtectionSetting = "1",
    DeletedMessagesSetting = "1",
    DiscordInviteSetting = "1",
    ChatFilterSetting = "1",
    //--------------------------------------------------
    //Level Up Configuration----------------------------
    LevelUpChannelID = "746451871794724904",
    LevelUpMoney = "200",
    MaxRandomXP = "5",
    MaxXP = "200",
    //--------------------------------------------------
    //Dead Chat Ping Configuration----------------------
    DCPPingChannelID = "704802753565949992",
    DCPPingRoleID = "705577160328347658",
    DCPTime = "6",
    //--------------------------------------------------
    //Support Channel Configuration---------------------
    TicketStaffPingRoleID = "747186171750252645",
    SuggestionPingRoleID = "789569674932912178",
    SuggestionChannelID = "738874224281649242",
    TicketLogChannelID = "767032869473878066",
    BugReportChannelID = "703833715738017822",
    TicketCategoryID = "767029093379473438",
    PollChannelID = "778680906856661054",
];

//---------------Configuration Help---------------//
//--------------------------
//##Bot Configuration


//BotPrefix: This is the prefix for commmands. Example -settings or !settings
//ActivityMessage: This is the message displayed under the bots name on Discord
//StaffApplicationSetting: This is where you can change the default setting for Staff Applications. 0 = off | 1 = on | There are no staff application points at this time!
//AutoModerationSetting: This is where you can change the default setting for Auto Modertation. 0 = off | 1 = on
//DeadChatPingSetting: This is where you can change the default setting for Dead Chat Pings. 0 = off | 1 = on
//LevelUpsSetting: This is where you can change the default setting for Level Ups. 0 = off | 1 = on


//--------------------------
//##Channel Configuration


//WelcomeChannelID: Put the ID of the channel you want new member messages to be sent to
//NewMemberRoleID: Put the ID of the role you want new members to get


//--------------------------
//##Admin Configuration


//DeletedMessageLogChannelID: The channel ID to log deleted messages
//PurgeLogChannelID: The channel ID to log message purges
//LogChannelID: The channel ID to log admin commands like bans, kicks, mutes, etc
//MuteRoleID: The role ID to apply to mute a user


//--------------------------
//##Auto Moderation Configuration


//MuteBypassProtection: Turn the Mute Bypass Protection off/on. 0 = off | 1 = on
//DeletedMessageSetting: Turn the Deleted Messages off/on. 0 = off | 1 = on
//DiscordInviteSetting: Turn the Discord Invite Protection off/on. 0 = off | 1 = on
//ChatFilterSetting: Turn the chat filter off/on. 0 = off | 1 = on


//--------------------------
//##Level Up Configuration


//LevelUpChannelID: Channel ID to send level up messages
//LevelUpMoney: The amount of money a user gets for each level up
//MaxRandomXP: The maximum amount of xp a user can get per message
//MaxXP: The amount of xp a user needs to level up


//--------------------------
//##Dead Chat Ping Configuration


//DCPPingChannelID: The channel to send the Dead Chat Ping in
//DCPPingRoleID: The role to ping for the Dead Chat Ping
//DCPTime: The amount of time in hours between pings


//--------------------------
//##Support Channel Configuration


//TicketStaffPingRoleID: The role tickets should ping when created
//SuggestionPingRoleID: The role to ping when there is a new suggestion
//SuggestionChannelID: The channel ID suggestion messages should go
//TicketLogChannelID: The channel ID Ticket logs should go
//BugReportChannelID: The channel ID bug report message go
//TicketCategoryID: The category ID tickets should be made under
//PollChannelID: The channel ID poll messages should go


//--------------------------
//##IMPORTANT


//For the bot configuration settings for groups of commands, once the json.sqlite file is made, you need to do -settings to change them from on/off!
//To have these changes take effect, you must turn the bot off then back on!
//Not configuring some of these fields may break the bot!


//------------------------------------------------//
