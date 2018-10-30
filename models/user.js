const db = require('../db');

module.exports = db.defineModel('user', {
    username: {
        type: db.STRING(100)
    },
    password: {
        type: db.STRING(100)
    },
    nickname: {
        type: db.STRING(100)
    },
    group: {
        type: db.STRING(20)
    }
});