const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
module.exports = new Command({
  name: "kick",
  description: "This command could be used by the server moderator to kick a user.",
  userPermissions: ["KICK_MEMBERS"],
  async run(message, args) {
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"
    const kickEmbed = new MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#ffff")
      .setTimestamp()
      .setFooter(client.user.tag ,client.user.displayAvatarURL());
    
    if(!args[0]) return message.channel.send("You need to state a user to kick. \`.kick @user reason\`");
    if(!mentionedMember) return message.channel.send("The member mentioned is not in the server.");
    if(!mentionedMember.kickable) return message.channel.send('I cannot kick that member.');
    try{
      await mentionedMember.send({ embeds: [kickEmbed] });
    } catch (err) {
      console.log(`I was unable to message the member.`);
    }
    
    try{
      await mentionedMember.kick()
    }catch (err) {
      console.log(err);
      return message.channel.send("I was unable to kick member mentioned .");
    }
  },
});
