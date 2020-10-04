const { workingColor, errorColor, successColor, neutralColor } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
    name: "updateinfo",
    description: "Updates the #server-info channel.",
    usage: "+updateinfo",
    execute(strings, message) {
        const executedBy = strings.executedBy.replace("%%user%%", message.author.tag)
        if (!message.member.roles.cache.has("752541221980733571")) return;
        message.client.channels.cache.get("762341271611506708").messages.fetch().then(msgs => { msgs.forEach(msg => { msg.delete().catch(console.error()) }) })
        const embed1 = new Discord.MessageEmbed()
            .setColor("#0022ff")
            .setTitle("Channels")
            .setDescription("Each channel has important information pinned in it. We highly recommend checking it out.")
            .addFields(
                { name: "Important ❕", value: "<#549503985501995011> - Important messages about the Discord server and the Crowdin projects.\n<#732587569744838777> - Here bot updates will be posted every now and then.\n<#646096405252800512> - In this channel we will post polls that you will be able to vote on in order influence certain changes on the server.\n<#618909521741348874> - The feed of our @HTranslators [Twitter page](https://twitter.com/HTranslators).\n<#758314105328762912> - Updates from our bot's [GitHub repository](https://github.com/QkeleQ10/hypixel-translators-bot-discord).\n<#699367003135148063> - All rules are listed here. Follow them, or there'll be consequences.\n<#699367079241056347> - This channel contains information about this server, so you can understand how it works better.\n<#699275092026458122> - A full guide to help you start translating with Crowdin! Here you'll find all info and some basic tools to help you translate.\n<#549882021934137354> - Displays members who join and leave the server.".substring(0, 1024) },
                { name: "Main Channels 💬", value: "<#621298919535804426> - You can use this channel to talk about anything you want really.\n<#619662798133133312> - A text channel where you can post your favorite memes.\n<#712046319375482910> - Post pics of your or someone else's cute pets here.\n<#644620638878695424> - A special channel for special people that have boosted our server. Thank you!\n<#550951034332381184> - A text channel where you can suggest things you would like to see in the Discord server. If you would like to suggest things for Hypixel, please visit the forums.\n<#549894938712866816> -  A channel for you to use bot commands in.\n<#713084081579098152> - If you can't speak while you're in a voice chat, talk here.".substring(0, 1024) },
                { name: "Language-specific channels", value: "We offer channels where translators and proofreaders for specific languages can interact with one another! You can speak English here, but we encourage you to speak the language you're translating. Please keep in mind these channels are not actively moderated. In case anything happens, please get in touch with an administrator." })
        message.client.channels.cache.get("762341271611506708").send("", embed1)
        const embed2 = new Discord.MessageEmbed()
            .setColor("#0055ff")
            .setTitle("Roles")
            .setDescription("Every role has a meaning behind it. Find out what they all are below!")
            .addFields(
                {
                    name: "Discord staff", value: "<@&549885900151193610> - The Discord Owner, <@241926666400563203>!\n<@&549885657749913621> - The Discord Administrator, <@240875059953139714>!\n<@&621071221462663169> - Our beloved Discord Moderators who keep the chats clean.\n<@&621071248079716355> - Our amazing Discord Helpers, they're basically minimods."
                },
                {
                    name: "Official Hypixel staff members", value: "They do not moderate the discord but they can be helpful when it comes to asking things regarding translation or the server.\n<@&624880339722174464> - Official Hypixel Administrators\n<@&551758392021090304> - Official Hypixel Moderators\n<@&551758392339857418> - Official Hypixel Helpers"
                },
                {
                    name: "Translators", value: "<@&551758391127834625> - These are the managers of the Hypixel project on Crowdin. Please only tag them if necessary.\n<@&645709877536096307> - These are the managers of the Quickplay project. They do the same as Hypixel Managers, but for Quickplay.\n<@&569839580971401236> - These are the Proofreaders for the Hypixel Crowdin project. They can pin important messages in their own language channels.\n<@&645709808745578496> - These are the Proofreaders for the Quickplay project. They have the same permissions as Hypixel Proofreaders\n<@&569839517444341771> - These are the Translators for the Hypixel project.\n<@&645709843436404767> - These are the Translators for the Quickplay project."
                },
                {
                    name: "Miscellaneous", value: "<@&719263346909773864> - A role given to <@291635552678313985> who gave away 3 MVP+ ranks during an event!\n<@&618502156638617640> - A role given to people who have helped create art for this server.\n<@&732586582787358781> - A role given to members who are in charge of the bot, <@722738307477536778> at the moment.\n<@&557090185670557716> - A role given to all users that joined in the first 6 months this server existed (August 28, 2019)\n<@&549894155174674432> - A role given to all bots in the Discord."
                }
            )
        message.client.channels.cache.get("762341271611506708").send("", embed2)
        const embed3 = new Discord.MessageEmbed()
            .setColor("#007ff")
            .setTitle("Bots")
            .setDescription("Information about all bots in the server is found here. The symbol inside the _[]_ in their nicknames indicate their prefix.")
            .addFields(
                {
                    name: "Bots", value: "<@725703559693205665> - Our personalised bot! This bot was developed by <@722738307477536778> and has a bunch of useful features. Execute `+help` in <#699380861857955880> to learn more!\n<@155149108183695360> - Dyno helps us moderate the server, so you can just ignore it.\n<@159985870458322944> - MEE6 is used for leveling and it has some nice custom commands, which are all shown below.\n<@235088799074484224> - Rythm is capable of playing some good tunes in a voice channel. If you're in one, you can execute `-play <song name/YouTube URL>` in <#549894938712866816>.\n<@472911936951156740> - VoiceMaster allows you to create custom voice channels by joining <#725763214771749034> and you can use <#549894938712866816> to customise them."
                },
                {
                    name: "Custom MEE6 commands", value: "**`!guidelines`** / `!guide` - Gives you the link to the official thread regarding Hypixel translations. This is the only command that's allowed in all channels.\n**`!invite`** - Gives you an invite link to the server, please only use this when you want to invite a friend.\n**`!thread`** - Gives you the link to the thread regarding this Discord server.\n**`!twitter`** - Gives you a link to our Twitter page.\n**`!hypixel`** - Gives you some useful information about the Hypixel Crowdin Project.\n**`!quickplay`** - Gives you some useful information about the Quickplay Crowdin Project.\n**`!sba`** - Gives you some useful information about the SkyblockAddons Crowdin Project."
                }
            )
            .setFooter("Need help? Ask your questions in #off-topic | Bot made with lots of care by QkeleQ10#6163")
        message.client.channels.cache.get("762341271611506708").send("", embed3)
        const embed = new Discord.MessageEmbed()
            .setColor(successColor)
            .setAuthor("Information channel updater")
            .setTitle("Updated the information channel!")
            .setFooter(executedBy)
        message.channel.send(embed)
    }
}