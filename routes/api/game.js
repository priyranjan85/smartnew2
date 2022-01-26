const express = require('express')
const router = express.Router()

const gameController = require('../../controllers/GameController')

router.post('/saveWinnerData', gameController.saveWinnerData)
router.post('/getTotalPayout', gameController.getTotalPayout)
router.post('/getTopWinners', gameController.getTopWinners)

module.exports = router
