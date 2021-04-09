let config = {};
    config = require(`${process.cwd()}/config.json`);

if(!config.token) {
    config = {
        token: process.env.token,
        prefix: process.env.prefix,
        mongouri: process.env.mongouri,
        ownerIds: [
            process.env.ownerIds
        ],
        website: {
          enabled: process.env.website.enabled,
          ip: process.env.website.ip,
          port: process.env.website.port 
        },
        topgg: {
          enabled: process.env.topgg.enabled,
          token: process.env.topgg.token
        }
    }
}

module.exports = config;
