const router = require('express').Router();
const storeController = require('../../controllers/store/storeController');
const bouquetController = require('../../controllers/store/bouquetController');
const checkLogin = require('../../util/checkLogin');

// 가게 페이지 라우팅
router.get('/store/:sellerId', storeController.showStore);
//router.get('/bouquet', bouquetController.addToBouquet);

//꽃다발 수량 페이지 
router.get('/bouquet/quantity/:flowerId', (req, res) => {
  // util 에 있는 checkLogin 에서 리다이렉션이 안돼야 렌더링할 수 있게 함.
  checkLogin(req,res,async () => { 
    const flowerId = req.params.flowerId;
  res.render('store/bouquetQuantity', { flowerId });})
 
});

//꽃다발 수량 페이지 
router.post('/bouquet/addToBouquet', bouquetController.addToBouquet);

//꽃다발 조회 페이지
router.get('/bouquet', bouquetController.showBouquet);

router.delete('/bouquet/:bouquetId/:flowerId', bouquetController.deleteBouquetItems);


module.exports = router;