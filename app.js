const express = require("express")
const app = express()
const port = 3000
const controllerPost = require("./controllers/post")
const controllerUser = require("./controllers/user")
// const aunthentication = require("./middlewares/authentication")

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get("/",controllerPost.home)
app.get("/post/add", controllerPost.addForm)
app.post("/post/add", controllerPost.postForm)
app.get("/register", controllerUser.register)
app.post("/register", controllerUser.postRegister)
app.get("/login", controllerUser.signIn)
app.post("/login", controllerUser.postSignIn)


app.listen(port, () => {
    console.log(`Masuk ${port}`)
  })