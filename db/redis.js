/*
* redis操作封装
* */
const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');
let client = redis.createClient(REDIS_CONFIG.port,REDIS_CONFIG.host);

module.exports = client;
