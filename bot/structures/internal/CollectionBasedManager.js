const { Collection } = require("discord.js"),
// eslint-disable-next-line no-unused-vars
  { HurricanoClient } = require("./Client.js");

  /**
   * A collection based manager.
   * @extends {Collection}
   * @property {HurricanoClient} client
   */
module.exports = class CollectionBasedManager extends Collection {
    constructor({ client, input }) {
        super(input);

        /**
         * Hurricano's client.
         * @type {HurricanoClient}
         */

        this.client = client;
    }
};