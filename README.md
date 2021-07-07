<h1 align="center"> Hurricano™  🌀</h1>
<p align="center">
<a href="https://github.com/HurricanoBot/Hurricano/blob/main/LICENSE.md"><img alt="GitHub license" src="https://img.shields.io/github/license/HurricanoBot/Hurricano?style=for-the-badge"></a>
<a href="https://github.com/HurricanoBot/Hurricano/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/HurricanoBot/Hurricano?style=for-the-badge"></a> 
<a href="https://github.com/HurricanoBot/Hurricano/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/HurricanoBot/Hurricano?style=for-the-badge"></a>
</p>
<h3 align="center">An open source Discord bot</h3> 

<h2>Features⭐ :</h2>

⭐ Command Cooldowns
<br/>
⭐ Command Permissions
<br/>
⭐ OwnerOnly Commands
<br/>
⭐ Args required or not Option
<br/>
⭐ Giveaways (using package `discord-giveaways`) which uses MongoDB
<br/>
⭐ Customizable server settings using MongoDB
<br/>
⭐ Logging
<br/>
⭐ a lot of / commands
<br/>
⭐ ...And many interesting commands! 


<h1> Getting Started  🚀</h1>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

<h2> Prerequisites 📋 </h2>
You'll need Git and Node.js (which comes with NPM) installed on your computer.
</br>
</br>

```
node@v14.0.0 or higher
npm@7.0.0 or higher
git@2.17.1 or higher
```
<hr>
<h2>Bot setup  🔧</h2>
1. Lets get started by cloning Hurricano on your local machine
</br>
</br>

```bash
# cloning the repository
$ git clone https://github.com/HurricanoBot/Hurricano.git

# go into the repository
$ cd Hurricano

```
2. Now rename the config.example.json file to config.json and the required enviormental variables like bot token ,owner ids etc.
```json
{
  "token": "Your bot token",
  "mongouri": "Mongodb uri",
  "prefix": "Your prefix",
  "ownerIds": ["Owner's USER IDs", "Like this", "can be as many"],
  "statcordKey": "optional, leave empty if you don't want statcord",
  "website": {
    "enabled": false,
    "ip": "Website IP",
    "port": "Port"
  },
  "topgg": {
    "enabled": false,
    "token": "only put something here if you set top.gg api to true",
    "webhook": {
      "enabled": false,
      "webhookPassword": "top.gg vote webhook password",
      "webhookPort": 1234,
      "channelID": "vote webhook channel ID",
      "webhookIP": "vote webhook IP"
    }
  },
  "botChannels": {
    "bugReport": "...",
    "feedback": "...",
    "serverJoinChannel": "..."
  }
}
```

3. Now install all the required dependecies for the bot and run the bot.

```bash
# install the required dependencies 
$ npm install

# Run the bot
$ node .
```

<h2>Invite Hurricano 🌀</h2>
<a href="https://top.gg/bot/803169312827113483">
    <img src="https://top.gg/api/widget/803169312827113483.svg" alt="HurricanoBot"/>
</a>

## Credits

Bot developed by:

- [Dragonizedpizza](https://github.com/Dragonizedpizza)
- [Militia21](https://github.com/Militia21)
- [Anogh297](https://github.com/Anogh297)
