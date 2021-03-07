require('module-alias/register')
const config = require('@config')
const { ShardingManager } = require('discord.js')
const manager = new ShardingManager('./bot/utilities/index.js', {
	totalShards: 'auto',
	token: config.token
});
manager.on('shardCreate', shard => {
	console.log(`[Shard ${shard.id}] Shard Launched!`)

	shard.on('ready',() => {
		console.log(`[Shard ${shard.id}] Shard Ready!`)
	})
	shard.on('disconnect', (a, b) => {
		console.log(`[Shard ${shard.id}] Shard disconnected.`)
		console.log(a)
		console.log(b)
	})
	shard.on('reconnecting', (a, b) => {
		console.log(`[Shard ${shard.id}] Reconnecting.`)
		console.log(a)
		console.log(b)
	})
	shard.on('death', (a, b) => {
		console.log(`[Shard ${shard.id}] Shard died.`)
	})
})
	manager.spawn()
