module.exports = class BaseEvent {
  constructor(name, options) {
    this.constructor.validate(name, options);
    this.name = name;
    this.client = options.client;
    this.description = options.description;
    this.once = options.once ?? false;
  }
  static validate(name, options) {
    if (!options) throw new Error("No options provided.");
    if (!name) throw new Error("No event name provided.");
    if (typeof name !== "string")
      throw new Error("Event name is not an object.");
    if (!options.client) throw new Error("No client provided.");
    if (typeof client !== "object") throw new Error("Client is not an object.");
    if (typeof options.description !== "string")
      throw new Error(
        "Event description is not a string. The event description is meant to provide what this event is meant for, etc."
      );
  }
  run() {
    throw new Error(`Event ${this.name}: No run function provided.`);
  }
};
