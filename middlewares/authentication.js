const session = require("express-session")

function aunthentication(req, res, next){
    if(!req.session.userId && req.session.userRole){
        const error = `Please login dulu`
        res.redirect(`/login?error=${error}`)
    } else{
        next()
    }
}

module.exports = {aunthentication}