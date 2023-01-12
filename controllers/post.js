const {Post, Profile, User} = require('../models/index')

class Controller{
    static home(req, res){
        let user
        Post.findAll(
            {
                include: [
                    {model: User, include: [Profile]}
                ]
            }
        )
        .then((data)=>{
            res.send (data)
        })
        .catch((err)=>{
            res.send(err)
        })
    }
}

module.exports = Controller