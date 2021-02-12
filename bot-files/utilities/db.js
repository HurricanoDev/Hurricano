const client = require("../handler-client/Client.js");
const Discord = require('discord.js');

class db {
    constructor() {
        return; // add stuff
    }

    async connect() {
        return await client.connectmongo(); 
    }

    async addUser() {
        return; // do something
    }
}

export default db; 