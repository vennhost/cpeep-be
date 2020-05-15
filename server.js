const express = require('express')
const app = express()
const passport = require("passport")
const mongoose = require("mongoose")
const userRouter = require("./src/routes/users")
const loanRouter = require("./src/routes/loans")

const mongooseConnection = require("./src/db/mongoose");
const listEndpoints = require("express-list-endpoints");
require("dotenv").config();
const port = process.env.PORT || 3300;
mongooseConnection();



app.use(express.json());

app.use("/users", userRouter)
app.use("/loans", loanRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.use(passport.initialize())





console.log(listEndpoints(app))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))