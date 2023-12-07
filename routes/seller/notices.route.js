const express = require('express');
const router = express.Router();
const noticesController = require('../../controllers/seller/notices.controller');

// 공지사항 목록 불러오기
router.get('/seller/notices', noticesController.getNotices);


// 공지사항 등록
router.post('/seller/notices', noticesController.addNotice);


module.exports = router;