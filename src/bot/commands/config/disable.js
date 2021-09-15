import Command from "@structures/Command.js";
export default new Command({
    name: "disable",
    descripton: "Disable a module.",
    userPermissions: ["ADMINISTRATOR"],
    async run({ message }) {
        const embed = await message.channel.sendSuccess("Available Modules:");
    },
});
