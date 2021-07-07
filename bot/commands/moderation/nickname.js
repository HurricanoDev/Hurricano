const Command = require("@Command");
const Discord = require("discord.js");
module.exports = new Command({
  name: "nickname",
  description: "Changes nickname of the user specified.",
  userPermissions: ["CHANGE_NICKNAME"],
  async run(message, args) {
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickName = args.slice(1).join(" ");
    if(!args[0]) return message.channel.send("You must state a member to change a nickname. `hr!nickname <mention_user> <nickname>`");
    if(!mentionedMember) return message.channel.send("The member stated is not in the server.");
    if(!nickName) return message.channel.send("You must state a nickname for the member. `hr!nickname <mention_user> <nickname>`");
    if(!mentionedMember.kickable) return message.channel.send('I cannot change the nickname of this member as his role is higher than mine. ');
    await mentionedMember.setNickname(nickName).catch(err => console.log(err)).then (message.channel.send("Nickname changed successfully!"));
  },
});
