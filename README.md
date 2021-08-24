<h1 align="center"> Hurricano™  🌀</h1>
<p align="center">
<a href="https://github.com/HurricanoBot/Hurricano/blob/main/LICENSE.md"><img alt="GitHub license" src="https://img.shields.io/github/license/HurricanoBot/Hurricano?style=for-the-badge"></a>
<a href="https://github.com/HurricanoBot/Hurricano/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/HurricanoBot/Hurricano?style=for-the-badge"></a> 
<a href="https://github.com/HurricanoBot/Hurricano/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/HurricanoBot/Hurricano?style=for-the-badge"></a>
<a href="https://discord.gg/vMvdy39qYD"><img alt="GitHub forks" src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>
<h3 align="center">An open source Discord bot!</h3>

<h2>Invite Hurricano 🌀</h2>
<div align=center>
<a href="https://discordbotlist.com/bots/803169312827113483"><img src="https://discordbotlist.com/api/v1/bots/803169312827113483/widget"></a>
<a href="https://top.gg/bot/803169312827113483"></center>
<img src="https://top.gg/api/widget/803169312827113483.svg" alt="HurricanoBot"/>
</a>

</div>

<h2>Features⭐ :</h2>

⭐ Mongoose-Based Command Cooldowns
<br/>
⭐ Command Permissions
<br/>
⭐ Slash Command Handler
<br/>
⭐ Subcommands system
<br/>
⭐ OwnerOnly Commands
<br/>
⭐ Args required or not Option
<br/>
⭐ Permissions handler
<br/>
⭐ Role-Requirement Giveaways
<br/>
⭐ Customizable server settings using MongoDB
<br/>
⭐ Button help-menu
<br/>
⭐ Starboard
<br/>
⭐ Logging
<br/>
⭐ a lot of `/` commands
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
1. Lets get started by cloning Hurricano on your local machine.
</br>
</br>

```bash
# cloning the repository
$ git clone https://github.com/HurricanoBot/Hurricano.git

# go into the repository
$ cd Hurricano

```

2. Now rename the config.example.json file to config.json and the required enviromental variables like bot token, ownerIds etc.

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

<h2 align="center"> Hosting ☁️</h2>
<p align="center">
<a href="https://heroku.com/"><img alt="heroku" src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"></a>
</p>
So you might be thinking how to host your bot on a cloud service so that it remains active 24/7 so currently we are hosting Hurricano on heroku which supports node v14.0.0 and npm v7.0.0 and above. 
<h2 align="center">Star Chart 🌟 </h2>
<a href="https://github.com/HurricanoBot/Hurricano/stargazers">
    <img src="https://starchart.cc/HurricanoBot/Hurricano.svg" alt="HurricanoBot"/>
</a>

## Project Maintainers ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/Dragonizedpizza"><img src="https://avatars.githubusercontent.com/u/70718540?v=4" width="100px;" alt=""/><br /><sub><b>Dragonizedpizza
</b></sub></a></td>
    <td align="center"><a href="https://github.com/Militia21"><img src="https://avatars.githubusercontent.com/u/70501605?v=4" width="100px;" alt=""/><br /><sub><b>Militia21</b></sub></a></td>
     <td align="center"><a href="https://github.com/achaljhawar"><img src="https://avatars.githubusercontent.com/u/35405812?v=4" width="100px;" alt=""/><br /><sub><b>Achal Jhawar</b></sub></a></td>
  </tr>
</table>
<img src="https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/d0facab8f7e20042e5f1381525d6a80ada6e62e6/other/undraw_real_time_collaboration_c62i.svg" width="50%" align="right">
<h2>🤝 Contributing</h2> 

Any idea on how we can make this more awesome ? [Open a new issue](https://github.com/Hurricanobot/Hurricano/issues)! We need all the help we can get to make this project awesome! You can also join the discord server to give suggestions. You can read the [Contributing guidelines](CONTRIBUTING.md).

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## All Stargazers ✨

[![Stargazers repo roster for @Hurricanobot/Hurricano](https://reporoster.com/stars/Hurricanobot/Hurricano)](https://github.com/Hurricanobot/Hurricano/stargazers)

## License 📝

Hurricano™ Bot is licensed under the GPL 3.0 license. See the file `LICENSE` for more information. If you plan to use any part of this source code in your own bot, We would be grateful if you would include some form of credit somewhere.
