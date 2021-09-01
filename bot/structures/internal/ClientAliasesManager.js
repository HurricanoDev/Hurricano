const CollectionBasedManager = require("./CollectionBasedManager");

/**
 *  Client aliases manager.
 * @extends {CollectionBasedManager}
 */
module.exports = class ClientAliasesManager extends CollectionBasedManager {
	constructor(...args) {
		super(...args);
	}
	add(...args) {
		super.set(...args);
	}
	remove(...args) {
		super.delete(...args);
	}
};
