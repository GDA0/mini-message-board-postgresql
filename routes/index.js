const express = require('express')
const controller = require('../controllers/controller')

const router = express.Router()

/* GET home page. */
router.get('/', controller.getAllMessages)

router.get('/messages/:id', controller.getMessage)

module.exports = router
