const db = require('../db');

module.exports = db.defineModel('todolist', {
    username: {
        type: db.STRING(100)
    },
    brief: {
        type: db.STRING(100)
    },
    detail: {
        type: db.STRING(1000)
    },
    startTime: {
        type: db.STRING(100)
    },
    endTime: {
        type: db.STRING(100)
    },
    status: {
        type: db.STRING(20)
    },
    TID: {
        type: db.STRING(100)
    }
});