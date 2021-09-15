function generateType(key, name, authorURL, description, thumbnail) {
    module.exports[key] = {
        name,
        authorURL,
        description,
        commands: (commandsMap) => commandsMap[key],
        thumbnail,
    };
}
generateType("config", "Configuration!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Config.png", "The commands meant to modify the bot. **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Config.jpg");
generateType("information", "Information!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Information.png", "Pretty self-explanitory! This module is meant for information commands. **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Information.jpg");
generateType("fun", "Fun!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Fun.png", "Commands in which you're sure to have fun! **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Fun.jpg");
generateType("giveaways", "Giveaways!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Giveaway.gif", "Host giveaways with Hurricano™️! **React** with other emojis to see what else there is", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Giveaway.jpg");
generateType("image", "Image!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/ImageManip.png", "Make funny images with Hurricano™️! **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Image.jpg");
generateType("music", "Music!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Music.gif", "Feel like listening to some music? You can do it with Hurricano™️!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Music.jpg");
generateType("levelling", "Levelling Commands!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Levelling.png", (message) => `Levelling commands! You require levelling to be enabled to use these commands. You can enable it via \`${message._usedPrefix}enable levelling\`. \n**React** with other emojis to see what else there is!`, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Levelling.jpg");
generateType("owner", "Bot Owner Commands!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/owner.png", "Commands meant for the bot owners. **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Owner.jpg");
generateType("suggestions", "Suggestions!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Suggest.png", "Suggestion commands! **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Suggestions.png");
generateType("moderation", "Moderation!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Moderation.png", "Moderation commands! **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Moderation.jpg");
generateType("utility", "Utility!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Utility.png", "Utility commands! **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Utility.jpg");
generateType("economy", "Economy!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Economy.png", "Economy commands! **React** with other emojis to see what else there is!", "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/categories/Economy.jpg");
export default {};
