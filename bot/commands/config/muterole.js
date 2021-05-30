const Command = require("@Command");
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: "muterole",
  aliases: ["setmuterole"],
  userPermissions: ["ADMINISTRATOR"],
  cooldown: 10,
  description: "Set/remove/create your server's mute role!",
  async run(message, args) {

    const guildPrefix = await client.db.guilds.getPrefix(message.guild.id);
    
    const defEmbed = new MessageEmbed()
      .setTitle("Options: `muterole`")
      .setDescription("No option provided! Valid options: `set, create, remove`")
      .addField("Option: Set", `Sets a muterole for your server! Usage: \`${guildPrefix}muterole set <role>\``)
      .addField("Option: Create", `Creates a muterole for your server automatically with permissions. Usage: \`${guildPrefix}muterole create\``)
      .addField("Option: Remove", `Removes the current muterole. Usage: \`${guildPrefix}muterole remove\``)
      .setColor("BLURPLE")
      .setThumbnail(message.author.displayAvatarURL())

      if(!args.length) return message.channel.send(defEmbed);

      switch(args[0].toLowerCase()) {
        case "set":
          const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

          if(!role) return message.sendErrorReply("Incorrect Usage", `Usage: \`${guildPrefix}muterole set <role/roleID>\``);
          
          const data = await client.schemas.guild.findOneAndUpdate({
            id: message.guild.id
          }, {
            muteRole: role.id
          }, {
            upsert: true,
          });
          client.db.guilds.cache.set(message.guild.id, data)
          message.sendSuccessReply("Success!", `The mute role was set => ${role}`);
          

        break;
        case "create":

        break;

        case "remove":

        break;
      }
  }
});