const Command = require("@Command");

module.exports = new Command({
  name: "tag",
  description: "Create a tag for this server.",
  userPermissions: ["MANAGE_GUILD"],
  usage: "create <create/delete>",
  examples: ["tag create", "tag delete"],
  subCommands: {
    commands: [
      [
        ["create", "new", "start"],
        async (message) => {
          let name, description;
          message.channel.sendSuccess(
            message,
            "Tags!",
            "Cool, you would like to create a tag! Please send the name here.",
          );
          let error;
          let conf = await message.channel
            .awaitMessages({
              filter: (x) => x.author.id === message.author.id,
              max: 1,
              time: 30000,
              errors: ["time"],
            })
            .catch(() => {
              error = true;
              return message.channel.sendError(
                message,
                "Time Limit Reached.",
                "You took too long to respond. Please try this command again.",
              );
            });
          if (error) return;
          conf = conf.first().content;
          if (conf.length < 4)
            return message.channel.sendError(
              message,
              "An Error Occured.",
              "The tag should be atleast 4 characters!",
            );
          if (conf.length > 40)
            return message.channel.sendError(
              message,
              "An Error Occured.",
              "The tag's length must be lesser than 40 characters!",
            );
          const tagExistsAlready = guildSchema.tags.find((x) => x === conf);
          if (tagExistsAlready)
            return message.channel.sendSuccess(
              message,
              "Error.",
              "This tag already exists.",
            );
          if (client.commands.get(conf))
            return message.channel.sendError(
              message,
              "An Error Occured.",
              "This tag's name is already a command!",
            );
          name = conf;
          message.channel.sendSuccess(
            message,
            "Cool!",
            "Cool! Now, please provide the tag's description.",
          );
          conf = await message.channel.awaitMessages({
            filter: (x) => x.author.id == message.author.id,
            max: 1,
            time: 30000,
            errors: ["time"],
          });
          let.catch(() => {
            return message.channel.sendError(
              message,
              "Time Limit Reached.",
              "You took too long. Please try again.",
            );
          });
          conf = conf.first().content;
          if (conf < 5)
            return message.channel.sendError(
              message,
              "Error.",
              "Please provide a more descriptive description, which is more than 5 characters!",
            );
          if (conf < 600)
            return message.channel.sendError(
              message,
              "Error.",
              "Your description can't be more than 600 characters!",
            );
          description = conf;
          message.channel.sendSuccess(
            message,
            "Cool!",
            "Cool! Now, please provide the content for this tag.",
          );
          conf = await message.channel
            .awaitMessages({
              filter: (x) => x.author.id == message.author.id,
              max: 1,
              time: 40000,
              errors: ["time"],
            })
            .catch(() => {
              return message.channel.sendError(
                message,
                "Time Limit Reached.",
                "You took too long. Please try this command again, without taking so much time!",
              );
            });
          conf = conf.first().content;
          if (conf.length < 3)
            return message.channel.sendError(
              message,
              "Error.",
              "Please try this command again, and make sure that the tag's content is larger than 3 letters!",
            );
          if (conf.length > 2000)
            return message.channel.sendError(
              message,
              "Error.",
              "Please make the content length lesser than 2000 characters.",
            );
          const array = {
            name: name,
            description: description,
            author: message.author.id,
            content: conf,
          };
          let arrayD = guildSchema.tags;
          arrayD.push(array);
          guildSchema.tags = arrayD;
          message.channel.sendSuccess(
            message,
            "Success!",
            "Successfully added the tag.",
          );
          const dat = await guildSchema.save();
          client.db.guilds.cache.set(message.guild.id, dat);
        },
      ],
      [
        "delete",
        async (message, args) => {
          const guildSchema = client.db.guilds.cache.get(message.guild.id);
          arg = args[0];
          if (!arg)
            return message.channel.sendError(
              message,
              "Error.",
              "Please provide a valid tag name!",
            );
          const tgNameIs = guildSchema.tags.find((x) => x === arg);
          if (!tgNameIs)
            return message.channel.sendError(
              message,
              "Invalid Tag Provided.",
              "Please provide a valid tag to delete!",
            );
          let arrayToDelete = guildSchema.tags;
          const indexValueToRemove = arrayToDelete.indexOf(tgNameIs);
          arrayToDelete.splice(indexValueToRemove);
          guildSchema.tags = arrayToDelete;
          const saveTheData = await guildSchema.save();
          client.db.guilds.cache.set(message.guild.id, saveTheData);
          return message.channel.sendSuccess(
            message,
            "Success!",
            "Successfully removed that tag!",
          );
        },
      ],
    ],
  },
  args: 'Incomplete arguments Provided. \n Possible subcommands: "create", "delete"',
});
