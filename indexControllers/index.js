const model = require('../model');

let
    User = model.user;


var CR_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
};

var CR_signup = async(ctx, next) => {
    var
        username = ctx.request.body.un || '',
        password = ctx.request.body.pw || '';
    var findUser = await User.findAll({
        where: {
            username: username
        }
    });
    if(findUser.length > 0){
        ctx.render('signup-failed.html', {
            message: 'Username already exists.'
        });
    } else {
        var newUser = await User.create({
            //id: id,
            username: username,
            password: password,
            nickname: 'TEMP',
            group: 'guest'
        });
        ctx.render('signin.html', {
            //title: 'Welcome'
        });
        console.log('create user: ' + JSON.stringify(newUser));
    }
};


module.exports = {
    'GET /' : CR_index,
    'POST /signup' : CR_signup
};