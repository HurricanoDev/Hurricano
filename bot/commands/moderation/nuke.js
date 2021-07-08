const Command = require("@Command");
const Discord = require("discord.js");
module.exports = new Command({
  name: "nuke",
  description: "This command will delete the channel the command is ran in and create a new channel with similar properties.",
  userPermissions: ["ADMINISTRATOR"],
  async run(message, args) {
    let reason = args.join(" ") || `By ${message.author.tag}`;
    const nukeChannel = message.channel;

    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason + ` | By ${message.author.tag}`).catch(err => console.log(err));
  },
});
