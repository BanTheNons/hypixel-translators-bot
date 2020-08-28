const { workingColor, errorColor, successColor, neutralColor } = require("../config.json");
const { help } = require("../strings/en.json")
const { prefix } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "help",
  description:
    "Shows you all available commands and general info about the bot.",
  aliases: ["commands", "cmds", "info", "botinfo"],
  usage: "help [name of command]",
  channelWhiteList: ["549894938712866816", "624881429834366986", "730042612647723058"],
  allowDM: true,
  cooldown: 5,
  execute(message, args) {
    const { commands } = message.client;

    if (!args.length) {
      const embed = new Discord.MessageEmbed()
        .setColor(neutralColor)
        .setAuthor(help.moduleTitle)
        .setTitle("List of commands")
        .setDescription(
          "Execute `+help <name of command>` to learn more about a specific command.\n_ _"
        )
        /*.addFields(
          { name: "Community", value: "prefix, mention, quote", inline: true },
          { name: "Translation", value: "context", inline: true },
          { name: "Bot", value: "help, bug, feedback", inline: true },
          { name: '\u200B', value: "This bot was made by <@722738307477536778> for the **Hypixel Translators Community Discord**.\nReport any bugs using \`+bug\` and suggest stuff with \`+feedback\`." }
        )*/
        .addFields(
          { name: "`" + commands.get("help").usage + "`", value: commands.get("help").description, inline: false },
          { name: "`" + commands.get("prefix").usage + "`", value: commands.get("prefix").description, inline: false },
          { name: "`" + commands.get("quote").usage + "`", value: commands.get("quote").description, inline: false },
          { name: "`" + commands.get("mention").usage + "`", value: commands.get("mention").description, inline: false },
          { name: "`" + commands.get("context").usage + "`", value: commands.get("context").description, inline: false },
          { name: "`" + commands.get("bug").usage + "`", value: commands.get("bug").description, inline: false },
          { name: "`" + commands.get("feedback").usage + "`", value: commands.get("feedback").description, inline: false }
        )
        .setFooter("Executed by " + message.author.tag);

      message.channel.send(embed)


    } else {

      const name = args[0].toLowerCase();
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) {
        const embed = new Discord.MessageEmbed()
          .setColor(errorColor)
          .setAuthor("Help")
          .setTitle("Command information")
          .setDescription("That command doesn't exist!")
          .setFooter("Executed by " + message.author.tag);
        return message.channel.send(embed);
      }

      const cooldown = command.cooldown + " second(s)";
      const embed = new Discord.MessageEmbed()
        .setColor(neutralColor)
        .setAuthor("Help")
        .setTitle("Command information for " + command.name)
        .setDescription(command.description)
        .addFields(
          {
            name: "Usage",
            value: "`" + prefix + command.usage + "`",
            inline: true
          },
          {
            name: "Cooldown",
            value: cooldown,
            inline: true
          }
        )
        .setFooter("Executed by " + message.author.tag);
      if (command.aliases) {
        embed.addFields({ name: "Aliases", value: command.aliases.join(", "), inline: true })
      }
      message.channel.send(embed);
    }
  }
};