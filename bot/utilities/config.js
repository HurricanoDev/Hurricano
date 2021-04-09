let config = {};
    config = require(`${process.cwd()}/config.json`);

if(!config.token) {
    const website = JSON.parse(JSON.stringify(process.env.website))
    const topgg = JSON.parse(JSON.stringify(proces.env.topgg))
    config = {
        token: process.env.token,
        prefix: process.env.prefix,
        mongouri: process.env.mongouri,
        ownerIds: [
            process.env.ownerIds
        ],
        website: website,
        topgg: topgg
    }
}

module.exports = config;
