require("module-alias/register");
const config = require("@config");
const { ShardingManager } = require("discord.js");
const logger = require("./bot/utilities/logger.js");
const manager = new ShardingManager("./bot/handlers/index.js", {
  totalShards: "auto",
  token: config.token,
});
manager.on("shardCreate", (shard) => {
  logger.shard(`[Shard ${shard.id}] Shard Launched!`);
  shard.on("ready", () => {
    logger.shard(`[Shard ${shard.id}] Shard Ready!`);
  });

  shard.on("message", (message) => {
    if (message === "kill") return shard.kill();
  });

  shard.on("disconnect", (a, b) => {
    logger.shard(`[Shard ${shard.id}] Shard disconnected.`);
    logger.shard(a);
    logger.shard(b);
  });
  shard.on("reconnecting", (a, b) => {
    logger.shard(`[Shard ${shard.id}] Reconnecting.`);
    logger.shard(a);
    logger.shard(b);
  });
  shard.on("death", (a, b) => {
    logger.shard(`[Shard ${shard.id}] Shard died.`);
  });
});
manager.spawn();