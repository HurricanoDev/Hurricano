require("module-alias/register");
const config = require("@config");
const { ShardingManager } = require("discord.js");
const logger = require('./bot/utilities/logger.js')
const manager = new ShardingManager("./bot/utilities/index.js", {
  totalShards: "auto",
  token: config.token,
});
manager.on("shardCreate", (shard) => {
  logger.info(`[Shard ${shard.id}] Shard Launched!`);

  shard.on("ready", () => {
    logger.info(`[Shard ${shard.id}] Shard Ready!`);
  });
  shard.on("disconnect", (a, b) => {
    logger.info(`[Shard ${shard.id}] Shard disconnected.`);
    logger.info(a);
    logger.info(b);
  });
  shard.on("reconnecting", (a, b) => {
    logger.info(`[Shard ${shard.id}] Reconnecting.`);
    logger.info(a);
    logger.info(b);
  });
  shard.on("death", (a, b) => {
    logger.info(`[Shard ${shard.id}] Shard died.`);
  });
});
manager.spawn();