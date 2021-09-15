import logger from "@structures/logger";
import dotenv from "dotenv";
let config;
dotenv.config();
try {
    config = require(`${process.cwd()}/config.json`);
}
catch (err) {
    config = JSON.parse(process.env.config);
}
if (!config.token)
    logger.emerg("No bot token provided!");
if (!config.mongouri)
    logger.emerg("No MongoDB uri provided!");
if (!config.website)
    logger.emerg("No website object provided!");
if (!config.topgg)
    logger.emerg("No Top.gg object provided!");
if (!config.botChannels)
    logger.emerg("No bot channels provided!");
export default config;
