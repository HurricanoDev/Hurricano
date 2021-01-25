export default class DragonNightCommand {
    constructor(client, options) {
        this.client = client;
        this.name = options.name; 
        this.description = options.description || ''; 
        this.ownerOnly = options.ownerOnly || false; 
        this.aliases = options.aliases || null;
        this.usage = options.usage;
        this.type = options.type || client.types.MISC;
        this.clientPermissions = options.clientPermissions || ['SEND_MESSAGES', 'EMBED_LINKS'];
        this.userPermissions = options.userPermissions || null;
        this.examples = options.examples || null;
        this.disabled = options.disabled || false;
        this.errorTypes = ['Invalid Argument Provided', 'Command Failure Happened']; 
    }

    run(message, args) {
        throw new Error(`The ${this.name} command has no run() method`);
    }
}