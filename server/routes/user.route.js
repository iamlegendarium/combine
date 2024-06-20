const express = require('express')
const router = express.Router()
const path = require('path')
const {getRegister, postRegister, getLogin, postLogin, getDashboard, verified, sendMail} = require('../controllers/user.controller')
const {verify} = require('jsonwebtoken')


router.get("/register", getRegister)
router.post("/register", postRegister)
router.get("/login", getLogin)
router.post("/login", postLogin)
router.get("/dashboard", getDashboard)
router.get("/verifyuser", verified)
router.get("/send-mail", sendMail)

module.exports = router