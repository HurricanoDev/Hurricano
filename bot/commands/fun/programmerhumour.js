const {
    MessageEmbed
} = require("discord.js");
const request = require('node-superfetch');
const Command = require("@Command");

module.exports = new Command({
    name: "programmerhumour",
    userPermissions: ["SEND_MESSAGES"],
    cooldown: 20,
    aliases: ["phumour"],
    description: "Displays a random meme from the programmer humour subreddit.",
    async run(message, args) {
        try {
            const {
                body
            } = await request
                .get("https://www.reddit.com/r/ProgrammerHumor.json?sort=top&t=week")
                .query({
                    limit: 800
                });
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
            const randomnumber = Math.floor(Math.random() * allowed.length);
            const embed = new Discord.MessageEmbed()
                .setColor("#ffff")
                .setTitle(allowed[randomnumber].data.title)
                .setDescription("Posted by: " + allowed[randomnumber].data.author)
                .setImage(allowed[randomnumber].data.url)
                .setFooter("Image provided by r/ProgrammerHumor");
            message.channel.send(embed);
        } catch (err) {
            console.log(err)
            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    },
});
