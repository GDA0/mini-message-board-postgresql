const express = require('express')
const controller = require('../controllers/controller')

const router = express.Router()

/* GET users listing. */
router.get('/', controller.addMessageGet)

router.post('/', controller.addMessagePost)

module.exports = router
