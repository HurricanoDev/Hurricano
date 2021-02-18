import 'module-alias/register';
import { Intents } from 'discord.js';
import Client from './bot/Client.js';
import config from './config.json';

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