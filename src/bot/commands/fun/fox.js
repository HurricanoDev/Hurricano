import Command from "@structures/Command.js";
import fetch from "node-fetch";
export default new Command({
    name: "fox",
    userPermissions: ["SEND_MESSAGES"],
    cooldown: 7,
    description: "Random pictures of a fox",
    async run(client, { message, args }) {
        const req = await fetch("https://foxapi.dev/foxes");
        const data = await req.json();
        const embed = new discord.MessageEmbed()
            .setColor("ff8800")
            .setFooter("<3 foxes")
            .setImage(image);
        await message.reply({ embeds: [embed] });
    },
});
