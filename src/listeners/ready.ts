import { client } from "../index.js"
import stats from "../events/stats.js"
import inactives from "../events/inactives.js"
import { listeningStatuses, watchingStatuses, playingStatuses } from "../config.json"

client.once("ready", async () => {
    console.log("Ready!")

    //Get server boosters and staff for the status
    let boostersStaff: string[] = []
    client.guilds.cache.get("549503328472530974")?.roles.cache.get("644450674796396576")!.members.forEach(member => boostersStaff.push(member.user.username)) //Server Booster
    client.guilds.cache.get("549503328472530974")?.roles.cache.get("768435276191891456")!.members.forEach(member => boostersStaff.push(member.user.username)) //Discord Staff

    //Set status
    client.user!.setPresence({ status: process.env.NODE_ENV === "dev" ? "dnd" : "online", activities: [{ name: "+help", type: "LISTENING" }] })

    //Change status and run events every minute
    setInterval(() => {
        const pickedUser = boostersStaff[Math.floor(Math.random() * boostersStaff.length)]
        const toPick = Math.ceil(Math.random() * 100) //get percentage
        // const statusType = client.user!.presence.activities[0].type

        if (toPick > 66) { //Higher than 66%
            let playingStatus = playingStatuses[Math.floor(Math.random() * playingStatuses.length)]
            playingStatus = playingStatus.replace("RANDOM_USER", pickedUser)
            client.user!.setActivity(playingStatus, { type: "PLAYING" })
        } else if (toPick <= 66 && toPick > 33) { //Between 33% and 66% (inclusive)
            let watchStatus = watchingStatuses[Math.floor(Math.random() * watchingStatuses.length)]
            watchStatus = watchStatus.replace("RANDOM_USER", pickedUser)
            client.user!.setActivity(watchStatus, { type: "WATCHING" })
        } else if (toPick <= 33 && toPick > 0) { //Between 0% and 33% (inclusive)
            let listenStatus = listeningStatuses[Math.floor(Math.random() * listeningStatuses.length)]
            listenStatus = listenStatus.replace("RANDOM_USER", pickedUser)
            client.user!.setActivity(listenStatus, { type: "LISTENING" })
        } else console.error("Couldn't set the status because the percentage is a weird number: " + toPick)

        stats(client, false)
        inactives(client, false)
    }, 60000)
})
