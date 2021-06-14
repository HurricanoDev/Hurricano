let config;
require("dotenv").config();
try {
  config = require(`${process.cwd()}/config.json`);
  config = {
    token: config.token,
    mongouri: config.mongouri,
    ownerIds: config.ownerIds,
    website: config.website,
    topgg: config.topgg,
    botChannels: config.botChannels,
    statcordKey: config.statcordKey,
  };
  module.exports = config;
} catch (err) {
  config = {
    token: process.env.token,
    mongouri: process.env.mongouri,
    ownerIds: process.env.ownerIds,
    website: JSON.parse(process.env.website),
    topgg: JSON.parse(process.env.topgg),
    botChannels: JSON.parse(process.env.botChannels),
    statcordKey: process.env.statcordKey,
  };
  module.exports = config;
}
let logger = require("./logger.js");
if (!config.token) logger.emerg("No bot token provided!");
if (!config.mongouri) logger.emerg("No MongoDB uri provided!");
if (!config.website) logger.emerg("No website object provided!");
if (!config.topgg) logger.emerg("No Top.gg object provided!");
if (!config.botChannels) logger.emerg("No bot channels provided!");
