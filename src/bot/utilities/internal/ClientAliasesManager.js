import CollectionBasedManager from "./CollectionBasedManager.js";
export default (class ClientAliasesManager extends CollectionBasedManager {
    constructor(...args) {
        super(...args);
    }
    add(...args) {
        super.set(...args);
    }
    remove(...args) {
        super.delete(...args);
    }
});
