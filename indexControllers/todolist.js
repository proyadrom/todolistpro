const model = require('../model');


let
    User = model.user,
    Work = model.work;

var CR_todoList = async (ctx, next) => {
    let username = ctx.session.username;
    var TodoListOpen = await Work.findAll({
        where : {
            username: username,
            status: "Open"
        }
    });
    var TodoListCompleted = await Work.findAll({
        where : {
            username: username,
            status: "Completed"
        }
    });
    if(TodoListOpen.length === 0 && TodoListCompleted.length) {
        ctx.render('todolist.html', {
            noWork : true
        });
    } else {
        ctx.render('todolist.html', {
            workOpen : TodoListOpen,
            workCompleted : TodoListCompleted
        });
    }
};

module.exports = {
    'GET /todolist' : CR_todoList
};