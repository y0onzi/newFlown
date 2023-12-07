const router = require('express').Router();
const buyerController = require('../../controllers/buyer/buyerController');
const { body, validationResult } = require('express-validator');
const userDao = require('../../models/User');


// 내 정보 조회
router.get('/buyer/my', buyerController.getBuyer);


// 리뷰 등록
//router.post('/buyer/reviews', buyerController.createReview);

// 리뷰 조회
//router.get('/buyer/reviews', buyerController.getReviews);

// 주문이력 조회
router.get('/buyer/myorder', buyerController.getMyOrder)

// 주문 이력 상세
router.get('/buyer/myorder/:id', buyerController.getMyOrderDetail);

module.exports = router;