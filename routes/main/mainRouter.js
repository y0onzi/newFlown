const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/main/mainController');

router.get('/', mainController.showMain);
router.get('/about', mainController.showAbout);

module.exports = router;