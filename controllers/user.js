
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
        res.render("signIn")
    }

    static postSignIn(req, res){
        const {username, password} = req.body
        User.findOne({where: {username: username}})
        .then((user)=>{
            if(user){
                const validatePassword = compare(password, user.password)
                if(validatePassword){
                    res.redirect("/")           
                } else{
                    const err = `check your password`
                    res.redirect(`/login?error=${err}`)
                }
            } else{
                const err = `Invalid username`
                res.redirect(`/login?error=${err}`)
                
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    }
}

module.exports = Controller