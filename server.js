const express = require("express")
const port = process.env.PORT || 3000

const app = express()


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.use(express.static(__dirname))


app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})