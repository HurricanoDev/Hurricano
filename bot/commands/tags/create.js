const Command = require('@Command');

module.exports = new Command({
    name: "create",
    description: "Create a tag for this server.",
    userPermissions: ["MANAGE_SERVER"],
    usage: ["create {tag name}"],
    examples: ["create How do I verify?"],
    async run (message, args) {
        const guildSchema = client.db.guilds.cache.get(message.guild.id);
        let name;
        if (!args.length) {
            message.channel.sendSuccess(message, "Tags!", "Cool, you would like to create a tag! Please send the name here.");
            let conf = message.channel.awaitMessages(x => x.author.id === message.author.id, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).catch(() => { return message.channel.sendError(message, "Time Limit Reached.", "You took too long to respond. Please try this command again.") });
            conf = conf.first().content;
            if (conf.length < 4) return message.channel.sendError(message, "An Error Occured.", "The tag should be atleast 4 characters!")
            if (conf.length > 40) return message.channel.sendError(message, "An Error Occured.", "The tag's length must be lesser than 40 characters!");
            name = conf;
        } else {
            const tempName = args.join(" ");
            if (tempName.length < 4) return message.channel.sendError(message, "An Error Occured.", "The tag should be atleast 4 characters!")
            if (tempName.length > 40) return message.channel.sendError(message, "An Error Occured.", "The tag's length must be lesser than 40 characters!");
            name = tempName;
        }
        message.channel.sendSuccess(message, "Cool!", "Cool! Now, please provide the tag's description.")
        let conf = await message.channel.awaitMessages(x => x.author.id == message.author.id, {
            ma: 1,
            time: 30000,
            errors: ['time']
        }).catch(() => { return message.channel.sendError(message, "Time Limit Reached.", "You took too long. Please try again.")})
    }
})