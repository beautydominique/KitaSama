
function authorization(req, res, next){
    if(req.session.userRole === "admin"){
        next()
    } else {
        const error = `Maaf anda bukan admin`
        res.redirect(`/?error=${error}`)
    }
}

module.exports = {authorization}