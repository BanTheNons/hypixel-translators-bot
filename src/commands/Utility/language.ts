import { errorColor, successColor, neutralColor } from "../../config.json"
import Discord from "discord.js"
import fs from "fs"
import { db } from "../../lib/dbclient"
import { Command } from "../../index"

const command: Command = {
    name: "language",
    description: "Changes your language, shows your current one or a list of available languages.",
    aliases: ["lang"],
    usage: "+language [<new language> | list]",
    channelWhitelist: ["549894938712866816", "624881429834366986", "730042612647723058"], //bots staff-bots bot-dev 
    allowDM: true,
    cooldown: 5,
    async execute(message: Discord.Message, args: string[], getString: (path: string, variables?: { [key: string]: string | number } | string, cmd?: string, lang?: string) => any) {
        let executedBy = getString("executedBy", { user: message.author.tag }, "global")
        const collection = db.collection("users"),
            stringsFolder = "./strings/"

        if (args[0]) {
            if (args[0] === "list") {
                const files = fs.readdirSync(stringsFolder)
                let langList = ""
                files.forEach(async (element, index, array) => {
                    if (element === "empty" && !message.member?.roles.cache.has("764442984119795732")) return //Discord Administrator
                    let languageString: string
                    if (element === "empty") languageString = "Empty"
                    else languageString = getString(element)
                    langList = `${langList}\n${getString("listElement", { code: element, language: languageString || "Unknown" })}`
                    if (index === array.length - 1) {
                        const embed = new Discord.MessageEmbed()
                            .setColor(neutralColor)
                            .setAuthor(getString("moduleName"))
                            .setTitle(getString("listTitle"))
                            .setDescription(langList)
                            .setFooter(executedBy, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                        await message.channel.send(embed)
                    }
                })
            } else if (args[0] === "stats" && message.member?.roles.cache.has("764442984119795732")) { //Discord Administrator
                if (!args[1]) throw "noLang"
                const files = fs.readdirSync(stringsFolder)
                if (!files.includes(args[1])) throw "falseLang"
                const langUsers = await collection.find({ lang: args[1] }).toArray()
                const users: string[] = []
                langUsers.forEach(u => users.push(`<@!${u.id}>`))
                const embed = new Discord.MessageEmbed()
                    .setColor(neutralColor)
                    .setAuthor("Language")
                    .setTitle(`There ${langUsers.length === 1 ? `is ${langUsers.length} user` : `are ${langUsers.length} users`} using that language at the moment.`)
                    .setFooter(`Executed By ${message.author.tag}`, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                if (args[1] !== "en") embed.setDescription(users.join(", "))
                message.channel.send(embed)
            } else {
                message.channel.startTyping()
                let newLang = args[0].toLowerCase()
                if (newLang === "se") newLang = "sv"
                const langdb = await db.collection("langdb").find().toArray(),
                    langdbEntry = langdb.find(l => l.name.toLowerCase() === newLang)
                if (langdbEntry) newLang = langdbEntry.code
                if (newLang === "empty" && !message.member?.roles.cache.has("764442984119795732")) newLang = "denied" //Discord Administrator
                const path = `./strings/${newLang}/language.json`
                fs.access(path, fs.constants.F_OK, async (err) => {
                    if (!err) {
                        if (getString("changedToTitle", this.name, "en") !== getString("changedToTitle", this.name, newLang) || newLang === "en") {
                            collection.updateOne({ id: message.author.id }, { $set: { lang: newLang } }).then(r => {
                                if (r.result.nModified) {
                                    executedBy = getString("executedBy", { user: message.author.tag }, "global", newLang)
                                    const embed = new Discord.MessageEmbed()
                                        .setColor(successColor)
                                        .setAuthor(getString("moduleName", this.name, newLang))
                                        .setTitle(getString("changedToTitle", this.name, newLang))
                                        .setDescription(getString("credits", this.name, newLang))
                                        .setFooter(executedBy, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                                    message.channel.stopTyping()
                                    return message.channel.send(embed)
                                } else {
                                    const embed = new Discord.MessageEmbed()
                                        .setColor(errorColor)
                                        .setAuthor(getString("moduleName", this.name, newLang))
                                        .setTitle(getString("didntChange", this.name, newLang))
                                        .setDescription(getString("alreadyThis", this.name, newLang))
                                        .setFooter(executedBy, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                                    message.channel.stopTyping()
                                    return message.channel.send(embed)
                                }
                            })
                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setColor(errorColor)
                                .setAuthor(getString("moduleName"))
                                .setTitle(getString("didntChange"))
                                .setDescription(getString("notTranslated"))
                                .setFooter(executedBy, message.author.displayAvatarURL())
                            return message.channel.send(embed)
                        }
                    } else {
                        await fs.readdir(stringsFolder, async (err, files) => {
                            const emptyIndex = files.indexOf("empty")
                            if (emptyIndex > -1 && !message.member?.roles.cache.has("764442984119795732")) files.splice(emptyIndex, 1) //Discord Administrator
                            const embed = new Discord.MessageEmbed()
                                .setColor(errorColor)
                                .setAuthor(getString("moduleName"))
                                .setTitle(getString("errorTitle"))
                                .setDescription(`${getString("errorDescription")}\n\`${files.join("`, `")}\`\n${getString("suggestAdd")}`)
                                .setFooter(executedBy, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                            message.channel.stopTyping()
                            message.channel.send(embed)
                        })
                    }
                })
            }
        } else {
            await fs.readdir(stringsFolder, async (err, files) => {
                const emptyIndex = files.indexOf("empty")
                if (emptyIndex > -1 && !message.member?.roles.cache.has("764442984119795732")) files.splice(emptyIndex, 1) //Discord Administrator
                const embed = new Discord.MessageEmbed()
                    .setColor(neutralColor)
                    .setAuthor(getString("moduleName"))
                    .setTitle(getString("current"))
                    .setDescription(`${getString("errorDescription")}\n\`${files.join("`, `")}\`\n\n${getString("credits")}`)
                    .setFooter(executedBy, message.author.displayAvatarURL({ format: "png", dynamic: true }))
                await message.channel.send(embed)
            })
        }
    }
}

export default command
