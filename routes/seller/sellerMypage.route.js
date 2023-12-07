const express = require('express');
const router = express.Router();
const sellerMypageController = require('../../controllers/seller/sellerMypage.controller');

// 판매자 마이페이지 조회
router.get('/seller/sellerMypage', sellerMypageController.getSellerMypage);

module.exports = router;