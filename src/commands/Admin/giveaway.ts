import Discord from "discord.js"
import { Command } from "../../index"

const command: Command = {
    name: "giveaway",
    description: "Gives you the winners of a giveaway.",
    aliases: ["reroll", "g", "greroll", "giveaways"],
    usage: "+giveaway <messageID> [winners]",
    roleWhitelist: ["764442984119795732"], //Discord Administrator
    async execute(message: Discord.Message, args: string[]) {
        if (!args[0]) return message.channel.send("You forgot to specify a message to look for! Use the message ID")
        const giveawayMsg = await message.channel.messages.fetch(args[0])
            .catch(err => {
                return message.channel.send("Couldn't find that message! Here's the error:\n" + err)
            })
        message.delete()
        const users = await giveawayMsg.reactions.cache.find(r => r.emoji.name == "🎉")?.users.fetch()
            .catch(err => {
                return message.channel.send("That message doesn't have any 🎉 reactions. Here's the error:\n" + err)
            }) as Discord.Collection<string, Discord.User>
        const winner: Discord.User[] = users!.random(Number(args[1]) || 1)
        let winners: Discord.User[] = []
        winner.forEach(user => winners.push(user))
        message.channel.send(`Congratulations to ${winners.join(", ")}`)
    }
}

export default command
