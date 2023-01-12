const express = require("express")
const app = express()
const port = 3000
const controllerPost = require("./controllers/post")
const ControllerUser = require("./controllers/user")

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get("/", controllerPost.home)
app.get("/post/add", controllerPost.addForm)
app.post("/post/add", controllerPost.postForm)
app.get("/register", ControllerUser.register)


app.listen(port, () => {
    console.log(`Masuk ${port}`)
  })