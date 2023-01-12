const express = require("express")
const app = express()
const port = 3000
const Controller = require("./controllers/post")

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get("/", Controller.home)


app.listen(port, () => {
    console.log(`Masuk ${port}`)
  })