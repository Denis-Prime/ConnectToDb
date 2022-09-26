const express = require("express")
const {LoginHandler,SignupHandler} = require("../Handle/handle")
const Router = express.Router()

Router.get('/login',LoginHandler)
Router.post('/signup',SignupHandler)

module.exports = {Router}