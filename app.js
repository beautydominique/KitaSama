const express = require("express")
const app = express()
const port = 3000
const controllerPost = require("./controllers/post")
const controllerUser = require("./controllers/user")
const { aunthentication } = require("./middlewares/authentication")
const session = require("express-session")
const { authorization } = require("./middlewares/authorization")




app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))
app.get("/register", controllerUser.register)
app.post("/register", controllerUser.postRegister)
app.get("/login", controllerUser.signIn)
app.post("/login", controllerUser.postSignIn)


app.get("/", controllerPost.home)
app.get("/post/read/:id", controllerPost.readPost)
app.get("/post/checkout/:id", controllerPost.checkout)
app.use(aunthentication)
app.get("/logout", controllerUser.logout)

app.use(authorization)
app.get("/post/edit/:id", controllerPost.edit)
app.post("/post/edit/:id", controllerPost.postEdit)
app.get("/post/add", controllerPost.addForm)
app.post("/post/add", controllerPost.postForm)
app.get("/post/delete/:id", controllerPost.destroyForm)


app.listen(port, () => {
  console.log(`Masuk ${port}`)
})