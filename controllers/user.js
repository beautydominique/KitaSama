
const { compare } = require("../helpers/bcyrpt")
const {User} = require("../models")



class Controller {
    static register(req, res){
        res.render("register")
    }

    static postRegister(req, res){
        const {name, username, password, role} = req.body
        User.create({name, username, password, role})
        .then(()=>{
            res.redirect("/login")
        })
        .catch((err)=>{
            res.send(err)
        })
    }

    static signIn(req, res){
        const {error} = req.query
        // console.log(Notiflix.Notify.failure('test'));

        res.render("signIn", {error})
    }

    static postSignIn(req, res){
        const {username, password} = req.body
        User.findOne({where: {username: username}})
        .then((user)=>{
            if(!user || !compare(password, user.password)) {
                const error = `Invalid username/password!`
                res.redirect(`/login?error=${error}`)
            } else {
                req.session.userId = user.id
                req.session.userRole = user.role
                res.redirect('/')
            }
        })
        .catch((err)=>{
            console.log(err);
            res.send(err)
        })
    }

    static logout(req, res){
        req.session.destroy((err)=>{
            if(err){
                res.send(err)
            } else{
                res.redirect("/")
            }
        })
    }
}

module.exports = Controller