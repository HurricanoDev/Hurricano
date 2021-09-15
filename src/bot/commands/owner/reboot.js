import Command from "@structures/Command.js";
export default new Command({
    name: "reboot",
    description: "reboot the bot.",
    ownerOnly: true,
    async run({ message, args }) {
        await message.sendSuccessReply("Reboot Initiated.", "Rebooting now.");
        setTimeout(() => {
            process.exit();
        }, 1000);
    },
});
