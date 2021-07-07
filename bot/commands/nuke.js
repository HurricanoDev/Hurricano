const Command = require("@Command");
const Discord = require("discord.js");
module.exports = new Command({
  name: "nuke",
  description: "This command will nuke the channel it used in and a new channel will be created with similar properties",
  userPermissions: ["ADMINISTRATOR"],
  async run(message, args) {
    let reason = args.join(" ");
    const nukeChannel = message.channel;

    if (!reason) reason = "No reason given.";

    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason).catch(err => console.log(err));
  },
});
