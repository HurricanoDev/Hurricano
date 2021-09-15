import Command from "@structures/Command.js";
export default new Command({
    name: "shutdown",
    description: "Shut the bot down.",
    ownerOnly: true,
    async run({ message, args }) {
        await message.channel.sendSuccess(message, "Confirmation.", "Are you sure you want to shutdown the bot? Please respond with `yes` if you would like to reboot the bot and `no` if you wouldn't.");
        let collected = await message.channel
            .awaitMessages({
            filter: (m) => m.author.id === message.author.id,
            max: 1,
            time: 5000,
            errors: ["time"],
        })
            .catch((e) => {
            message.channel.sendError(message, "Time Limit Reached.", "You took more than 20 seconds. Please try again.");
        });
        collected = collected.first();
        if (collected.content == "yes") {
            message.sendSuccessReply("Rebooting...", "Rebooting the bot now.");
            setTimeout(() => {
                client.shard.send("kill");
            }, 2000);
        }
        else if (collected.content == "no") {
            message.sendSuccessReply("Cancelling Reboot.", "Cancelling the bot reboot.");
        }
        else {
            message.sendErrorReply("Invalid Response Provided.", "You did not provide a valid response between `yes` or `no`. Please try again.");
        }
    },
});
