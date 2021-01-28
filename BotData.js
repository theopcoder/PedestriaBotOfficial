var BotData = [
    Version = "2.1.3",
    VN = "2.1.3 Feature Update",//VN stands for Version Name
    Developer = "TheMLGDude#2177 | theopcoder",
    DeveloperDiscord = "TheMLGDude#2177",
    DeveloperGitHub = "theopcoder",
];

var DevPromt = [
    DevWarning = ":warning: You are attempting to access developer features that can cause damage! Proceed with caution!",
    DevAccess = "**:no_entry_sign:** Access Denied! :no_entry_sign:",
];

var Errors = [
    ArgError = "**:warning: Error 6:** ```Invalid description or argument detected! Try making sure the command is being performed right and try again! If you are sure you have, please contact the bot owner!```",
    ImplementXPError = "**:warning: Error 4:** ```This command/feature has not yet been implemented yet! Please check back in the next bot update! Thank you! If you are sure it has been implemented, please contact the bot owner!```",
    UpdateError = "**:shield: Error 2:** This is an outdated bot version! Please update to the new Bot Version for the latest features, commands and security fixes! If you think this is a mistake, please contact the bot owner.",
    ImplementError2 = "**:warning: Error 3:** ```Sorry, this command/feature hasn't been implemented yet! Check back in future updates! If you think it already has been, please contact the bot owner.```",
    PermissionError = "**:no_entry_sign: Error 5:** You do NOT have the permission to perform this command/feature! :no_entry_sign:",
    DescriptionError = "**:warning: Error 7:** ```There was no description given! Please give a description or argument! If you did give a valid argument, please contact the bot owner, as it may be a bug!```",
    StaffUser = ":no_entry_sign: Sorry, you can't perform this command on a staff member!",
    PermissionError2 = ":no_entry_sign: You don't have the correct permission!",
    UserAlreadyUnmuted = ":warning: That user is already unmuted!",
    DMMessage = ":warning: You can't use this command in DM's!",
    UserAlreadyUnBanned = ":warning: That user isn't banned! ",
    UserAlreadyMuted = ":warning: That user is already muted!",
    NullUser = ":warning: Sorry, I couldn't find that user!",
    XPError = "**:warning: Error 1:** You have no xp!",
];

var BotConfiguration = [
    //--------------------------------------------------
    //Bot Configuration---------------------------------
    BotPrefix = "-",
    ActivityMessage = "play.pedestriamc.com | The Official Wiki for PedestriaMC Network is now released!",
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
    MCWorldsAlertChannelID = "800152630617178132",
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
//AutoModerationSetting: This is where you can change the default setting for Auto Modertation. 0 = off | 1 = on
//DeadChatPingSetting: This is where you can change the default setting for Dead Chat Pings. 0 = off | 1 = on
//LevelUpsSetting: This is where you can change the default setting for Level Ups. 0 = off | 1 = on


//--------------------------
//##Channel Configuration


//WelcomeChannelID: Put the ID of the channel you want new member messages to be sent to
//NewMemberRoleID: Put the ID of the role you want new members to get


//--------------------------
//##Admin Configuration


//DeletedMessageLogChannelID2: The channel ID to log deleted messages on the secont Discord server
//DeletedMessageLogChannelID: The channel ID to log deleted messages
//MCWorldsAlertChannelID: The channel ID to alert staff when someone curses in the Minecraft server
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
