const { Intents } = require('discord.js');
const Client = require('./bot/Client.js');
const config = require('./config.json')
const intents = new Intents();
intents.add(
	'GUILD_PRESENCES',
	'GUILD_MEMBERS',
	'GUILDS',
	'GUILD_VOICE_STATES',
	'GUILD_MESSAGES',
	'GUILD_MESSAGE_REACTIONS'
);
const client = new Client(config, { ws: { intents: intents } })
global.client = client;

// website initialization
if (client.config.website.enabled) {
    require('./website/index.js');
}
function init(){
	client.loadCommands()
	client.loadEvents()
	client.loadTopgg()
	client.db.init()
	client.login(client.token);
}

init();