// eslint-disable-next-line no-unused-vars
const { HurricanoClient } = require("./Client.js");

/**
 * Manager for all custom client functions.
 */

module.exports = class ClientFunctionsManager {

    /**
     * Initializes the class.
     * @param {HurricanoClient} client 
     */

    constructor(client) {
        
        /**
         * Hurricano's client.
         * @type {HurricanoClient}
         */

        this.client = client;
    }
    async createUserDB(user) {
        const data = await (new this.client.schemas.user({
          name: user.name,
          id: user.id,
        })).save();
        return data;
    }
};