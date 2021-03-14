const { Intents } = require('discord.js');
require('module-alias/register');
require('./reply.js')
const mongoose = require('mongoose')
const Client = require('@root/bot/Client.js');
const config = require('@config')
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
// require('@root/bot/utilities/schema.js')(client);
global.client = client;
// website initialization
if (client.config.website.enabled) {
    require('@root/website/index.js');
}
function init(){
	client.loadCommands()
	client.loadEvents()
	client.loadTopgg()
	client.db.init()
	client.login(client.token);
}

init();

module.exports = client;