const { Post, Profile, User, Category } = require('../models/index')
const { getIDR } = require("../helpers/bcyrpt")

class Controller {
    static home(req, res) {
        let title = req.query.title
        let dataPost
        Post.searchTitle(title)
            .then((data) => {
                dataPost = data
                return Category.findAll()
            })
            .then((categories) => {
                let isLoggedIn = req.session.userId ? true : false
                res.render('home', { data: dataPost, categories, isLoggedIn, getIDR })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addForm(req, res) {
        const reqError = req.query.errors
        let error
        if (reqError) {
            error = reqError.split(',')
        }
        Post.findAll()
            .then((data) => {
                res.render("addForm", { data, error })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static postForm(req, res) {
        const { title, description, donation, isUrgent, imageURL } = req.body
        Post.create({ title, description, donation, isUrgent, imageURL })
            .then(() => {
                res.redirect("/")
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    const data = err.errors.map((el) => el.message)
                    res.redirect(`/post/add?errors=${data}`)
                } else {
                    res.send(err)
                }
            })
    }


    static readPost(req, res) {
        const { id } = req.params
        Post.findOne({
            include: User,
            where: {
                id
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('./seeDetail', { data, getIDR })
            })
            .catch((err) => {

                res.send(err)
            })
    }
    static edit(req, res) {
        const id = req.params.id
        Post.findByPk(id)
            .then((data) => {
                res.render("editForm", { data })
            })
            .catch((err) => {
                res.send((err))
            })
    }

    static postEdit(req, res) {
        const id = req.params.id
        const { title, description, donation, imageURL } = req.body
        Post.update({ title, description, donation, imageURL }, { where: { id } })
            .then(() => {
                res.redirect("/")
            })
            .catch((err) => {
                res.send(err)
            })

    }

    static destroyForm(req, res) {
        const { id } = req.params
        // console.log(id, '<<<<<<<<<<');
        Post.destroy({
            where: {
                id
            }
        })
            .then((result) => {
                // res.send(id)
                res.redirect('/')
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            })
    }

    static checkout(req, res) {
        const { id } = req.params
        User.findOne({
            include: Profile,
            where: {
                id
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('./postCheckout', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller