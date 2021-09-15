import Command from "@structures/Command.js";
export default new Command({
    name: "leaveguild",
    description: "Force Hurricano to leave a server.",
    args: "Give me a ID of a server to leave.",
    ownerOnly: true,
    async run({ message, args }) {
        const guild = client.guilds.cache.find((x) => x.id === args[0]);
        if (!guild)
            return message.channel.sendError(message, "Invalid Guild ID!", "You haven't provided me a valid guild ID.");
        await message.channel.sendSuccess("Done!", `Left guild with ID: \`${guild.id}\``);
        guild.leave();
    },
});
