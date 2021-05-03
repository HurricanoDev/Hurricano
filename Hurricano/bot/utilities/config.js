let config = require(`${process.cwd()}/config.json`);
module.exports = {
  token: config.token || process.env.token,
  prefix: config.prefix || process.env.prefix,
  mongouri: config.mongouri || process.env.mongouri,
  ownerIds: config.ownerIds || process.env.ownerIds,
  website: config.website || JSON.parse(JSON.stringify(process.env.website)),
  topgg: config.topgg || JSON.parse(JSON.stringify(proces.env.topgg)),
};
