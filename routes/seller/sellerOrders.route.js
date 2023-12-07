const express = require('express');
const router = express.Router();
const ordersController = require('../../controllers/seller/sellerOrders.controller');

// 주문 목록 불러오기
router.get('/seller/sellerOrders', /*ensureAuthenticated,*/ ordersController.getOrders);

// 주문서 보기
router.get('/seller/sellerOrderSheet/:orderId', ordersController.sellerGetOrderSheet);

module.exports = router;
