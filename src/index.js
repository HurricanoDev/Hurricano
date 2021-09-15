import logger from "./bot/structures/internal/logger.js";
import moduleAlias from "./bot/utilities/module-alias.js";
import config from "@config";
import { ShardingManager } from "discord.js";
moduleAlias();
const manager = new ShardingManager("./bot/handlers/index.js", {
    totalShards: "auto",
    token: config.token,
});
// const Statcord = require("statcord.js").ShardingClient;
// const stat = config.statcordKey && config.statcordKey !== "optional, leave empty if you don't want" ? new Statcord({
//   key: config.statcordKey,
//   manager: manager,
//   postCpuStatistics: true,
//   postMemStatistics: true,
//   postNetworkStatistics: true,
//   autopost: true
// }) : null;
manager.on("shardCreate", (shard) => {
    logger.shard(`[Shard ${shard.id}] Shard Launched!`);
    shard.on("ready", () => {
        logger.shard(`[Shard ${shard.id}] Shard Ready!`);
    });
    shard.on("message", (message) => {
        if (message === "kill")
            return shard.kill();
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
        a ? logger.shard(a) : null;
        b ? logger.shard(b) : null;
    });
});
manager.spawn();
process.on("unhandledRejection", (error) => {
    logger.error(error);
});
