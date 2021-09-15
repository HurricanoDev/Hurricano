import Command from "@structures/Command.js";
export default new Command({
    name: "test",
    description: "Test if the bot's slash commands are working, and make it say something.",
    slash: {
        name: "test",
        isSlash: true,
        options: [
            {
                name: "text",
                description: "What you want the bot to say.",
                type: 3,
                required: true,
            },
        ],
        async run({ message, args }) {
            await message.reply(args[0].value, { ephemeral: true });
        },
    },
});
