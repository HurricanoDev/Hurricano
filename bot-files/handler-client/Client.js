const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../../config.json');
const guildPrefixes = {};
const mongoconnect = require('../utilities/mongoconnect.js')
const mongoose = require('mongoose');


clinet.connectmongo = async function (){
  await mongoconnect().then((mongoose) => {
    try {
      console.log('MongoDB Connected!')
    } finally {
      mongoose.connection.close()
    }
    })
  } 

module.exports = client;
