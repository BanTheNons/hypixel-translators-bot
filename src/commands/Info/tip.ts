import Discord from "discord.js"
import { neutralColor } from "../../config.json"
import { Command } from "../../index"

const command: Command = {
  name: "tip",
  description: "Gives you a random tip.",
  usage: "+tip",
  cooldown: 10,
  allowDM: true,
  allowTip: false,
  channelWhitelist: ["549894938712866816", "624881429834366986", "730042612647723058", "551693960913879071"], // bots staff-bots bot-development admin-bots
  execute(message: Discord.Message, args: string[], getString: (path: string, variables?: { [key: string]: string | number } | string, cmd?: string, lang?: string) => any) {
    const executedBy = getString("executedBy", { user: message.author.tag }, "global")
    const keys = Object.keys(getString("tips", "global"))
    const tip = getString(`tips.${keys[keys.length * Math.random() << 0]}`, { botUpdates: "<#732587569744838777>", gettingStarted: "<#699275092026458122>", twitter: "<https://twitter.com/HTranslators>", rules: "<#796159719617986610>", serverInfo: "<#762341271611506708>", bots: "<#549894938712866816>" }, "global")
    const embed = new Discord.MessageEmbed()
      .setColor(neutralColor)
      .setAuthor(getString("tip", "global"))
      .setDescription(tip)
      .setFooter(executedBy, message.author.displayAvatarURL())
    message.channel.send(embed)
  }
}

export default command
