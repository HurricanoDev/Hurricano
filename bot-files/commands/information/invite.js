const config = require('../../../config.json'); 
module.exports = {
    name: "invite",
    aliases: ["inviteme", "botinvite"],
    description: "Sends the bot invite, along with a few other invites.",
    run: async(client, message, args) => {
        message.channel.send({ embed: {
            title: "Invite Me!",
            fields: [
                {
                  name: "Bot Invite!",
                  value: "You can invite me by clicking [here](https://discord.com/oauth2/authorize?client_id=803169312827113483&permissions=8&scope=bot) or by using the following link! \n Link: https://discord.com/oauth2/authorize?client_id=803169312827113483&permissions=8&scope=bot"
                },
                {
                    name: "Support Server!",
                    value: "You can join the support server by clicking [here](https://discord.gg/VQ6cU2cZwV) or using the following link! \n Link: https://discord.gg/VQ6cU2cZwV"
                }
              ],
            footer: {text: `Tip: Use the '${config.prefix}vote' command to vote for us!`}
            }})
    }
}