const {Post, Profile, User} = require('../models/index')

class Controller{
    static home(req, res){
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

    static addForm(req, res){
        Post.findAll()
        .then((data)=>{
            res.render("addForm",{data})
        })
        .catch((err)=>{
            res.send(err)
        })
    }

    static postForm(req, res){
        const {title, description, donation, isUrgent, imageURL} = req.body
        Post.create({title, description, donation, isUrgent, imageURL})
        .then(()=>{
            res.redirect("/")
        })
        .catch((err)=>{
            res.send((err))
        })
    }
}

module.exports = Controller