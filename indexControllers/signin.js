const model = require('../model');


let
    User = model.user;
    Work = model.work;

var CR_signin = async(ctx, next) => {
    var
        username = ctx.request.body.un || '',
        password = ctx.request.body.pw || '';
    if(ctx.session.time && Date.now() - ctx.session.time < 1000*60*30) {
        ctx.response.redirect('/todolist');
    } else {
        console.log('disOnline');
    }
    if(username === '' && password === '') {
        ctx.render('signin.html', {

        });
    } else {
        var findUser = await User.findAll({
            where : {
                username: username
            }
        });
        if(findUser.length === 0) {
            ctx.render('signin.html', {
                failed : true,
                message: 'Username not exist.'
            });
        } else {
            if(findUser[0].password === password){
                ctx.session.time = Date.now();
                ctx.session.username = username;
                ctx.response.redirect('/todolist');
            } else {
                ctx.render('signin.html', {
                    failed : true,
                    message: 'The password is incorrect.'
                });
            }
        }
    }
};

module.exports = {
    'GET /signin' : CR_signin,
    'POST /signin' : CR_signin
};