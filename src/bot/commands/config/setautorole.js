import Command from "@structures/Command.js";
export default new Command({
    name: "setautorole",
    aliases: ["autorole"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 15,
    description: "Set an autorole to give to new members upon joining your server.",
    async run({ message, args }) {
        //Some stuff
        const prefix = message._usedPrefix;
        const role = message.mentions.roles.first() ||
            message.guild.roles.cache.get(args[1]);
        //No Permission
        if (!message.guild.me.permissions.has("MANAGE_ROLES"))
            return message.channel.sendError(message, "Error", "I am missing the: `MANAGE_ROLES` permission needed to execute this command.");
        switch (args[0]) {
            case "set":
                //Invalid role
                if (!role)
                    return message.channel.sendError(message, "Error", `The role you provided was invalid.`);
                await client.schemas.guild.findOneAndUpdate({ id: message.guild.id }, { autoRole: role.id }, { upsert: true });
                return message.sendSuccessReply("Autorole set!", `The autorole for this server was set to: ${role}`);
                break;
            case "remove":
                await client.schemas.guild.findOneAndUpdate({ id: message.guild.id }, { autoRole: null });
                return message.sendSuccessReply("Autorole Removed!", `The autorole for this guild has been removed!`);
                break;
            default:
                return message.sendErrorReply("Invalid Arguments.", `Please provide whether you would like to set a role, or remove it! \n To set a autorole, type: \`\`\`xl\n${prefix}autorole set {role/id}\`\`\`, and if you would like to remove a autorole, type \`\`\`js\n${prefix}autorole remove\`\`\``);
        }
    },
});
