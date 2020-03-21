let NODE_ENV = process.env.NODE_ENV;
let MYSQL_CONFIG = null;
let REDIS_CONFIG = null;

if(Object.is(NODE_ENV,'production')) {
    MYSQL_CONFIG = {
        host:'localhost',
        user:'root',
        password:'KJHG13jdch43Gida31HD2',
        port:3306,
        database:'blog'
    };
    REDIS_CONFIG = {
        port:6379,
        host:'127.0.0.1'
    }
} else {
    MYSQL_CONFIG = {
        host:'localhost',
        user:'root',
        password:'19981020',
        port:3306,
        database:'blog'
    };
    REDIS_CONFIG = {
        port:6379,
        host:'127.0.0.1'
    }
}
module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
};
