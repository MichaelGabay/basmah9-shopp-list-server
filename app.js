const express = require("express");
const app = express()
require("./db/dbConnector")
const mainRouter = require("./routes/indexRoutes")
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "PUT", "DELETE", "PATCH", "GET"],
}))

app.use(mainRouter)

const port = process.env.PORT || 3001
app.listen(port, () => console.log("server running on port " + port));
