const express = require('express');
const router = express.Router();
const flowersController = require('../../controllers/seller/flowers.controller');
const upload = require('../../middlewares/upload');

// 상품 목록 조회
router.get('/seller/flowers', flowersController.getFlowers);
// 상품 등록
router.post('/seller/flowers', upload.single('photo'), flowersController.addFlower);

module.exports = router;