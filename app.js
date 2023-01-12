const express = require("express")
const app = express()
const port = 3000
const controllerPost = require("./controllers/post")
const controllerUser = require("./controllers/user")
const {aunthentication} = require("./middlewares/authentication")
const session = require("express-session")
const { authorization } = require("./middlewares/authorization")




app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false,
  cookie:{
    secure: false,
    sameSite: true
  }
}))
app.get("/register", controllerUser.register)
app.post("/register", controllerUser.postRegister)
app.get("/login", controllerUser.signIn)
app.post("/login", controllerUser.postSignIn)


app.get("/",controllerPost.home)
app.use(aunthentication)

app.use(authorization)

app.get("/post/add",  controllerPost.addForm)
app.post("/post/add",  controllerPost.postForm)


app.listen(port, () => {
    console.log(`Masuk ${port}`)
  })