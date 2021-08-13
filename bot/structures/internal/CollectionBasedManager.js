// eslint-disable-next-line no-unused-vars
const { Collection, Client } = require("discord.js");

/**
 * A collection based manager.
 * @extends {Collection}
 * @property {Client} client
 */
module.exports = class CollectionBasedManager extends Collection {
  constructor({ client, input }) {
    super(input);

    /**
     * Hurricano's client.
     * @type {Client}
     */

    this.client = client;
  }
  filter(fn, thisArg) {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    const results = new Collection[Symbol.species]();
    for (const [key, val] of this) {
      if (fn(val, key, this)) results.set(key, val);
    }
    return results;
  }
  partition(fn, thisArg) {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    const results = [
      new Collection[Symbol.species](),
      new Collection[Symbol.species](),
    ];
    for (const [key, val] of this) {
      if (fn(val, key, this)) results[0].set(key, val);
      else {
        results[1].set(key, val);
      }
    }
    return results;
  }
  flatMap(fn, thisArg) {
    const collections = this.map(fn, thisArg);
    return new Collection[Symbol.species]().concat(...collections);
  }
  mapValues(fn, thisArg) {
    if (typeof thisArg !== "undefined") fn = fn.bind(thisArg);
    const coll = new Collection[Symbol.species]();
    for (const [key, val] of this) coll.set(key, fn(val, key, this));
    return coll;
  }
  clone() {
    return new Collection[Symbol.species](this);
  }
  intersect(other) {
    const coll = new Collection[Symbol.species]();
    for (const [k, v] of other) {
      if (this.has(k)) coll.set(k, v);
    }
    return coll;
  }
  difference(other) {
    const coll = new Collection[Symbol.species]();
    for (const [k, v] of other) {
      if (!this.has(k)) coll.set(k, v);
    }
    for (const [k, v] of this) {
      if (!other.has(k)) coll.set(k, v);
    }
    return coll;
  }
  sorted(compareFunction = Collection.defaultSort) {
    return new this.constructor[Symbol.species](this).sort((av, bv, ak, bk) =>
      compareFunction(av, bv, ak, bk),
    );
  }
};