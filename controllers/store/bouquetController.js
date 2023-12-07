const { compare } = require("bcrypt");
const bouquetModel = require("../../models/bouquet");
const checkLogin = require("../../util/checkLogin");

module.exports = {
  addToBouquet: async (req, res) => {
    checkLogin;
    try {
      // 세션에서 구매자+판매자 ID 추출 
      const buyerId = req.session.user.id;
      const sellerId = req.session.sellerId;

      // 꽃다발 검증
      let bouquetId = req.session.bouquetId;

      if (!bouquetId) {
        // 꽃다발 아이디가 없는 경우, 새로운 꽃다발 생성
        bouquetId = await bouquetModel.createBouquet(buyerId, sellerId, 0);
        req.session.bouquetId = bouquetId;
      } else {
        // 꽃다발 아이디가 있는 경우, 해당 꽃다발의 is_new 값 확인
        const existingBouquet = await bouquetModel.getBouquetById(bouquetId, buyerId, sellerId);
        if (!existingBouquet || existingBouquet.is_new === 2) {
          // 꽃다발이 없거나 is_new가 2인 경우, 새로운 꽃다발 생성
          bouquetId = await bouquetModel.createBouquet(buyerId, sellerId, 0);
          req.session.bouquetId = bouquetId;
        }
      }


      console.log("부케아이디확인: " + bouquetId)

      // 꽃다발에 꽃 추가
      const flowerId = req.body.flowerId;
      const quantity = req.body.quantity;
      await bouquetModel.insertToBouquet(bouquetId, flowerId, quantity);

      res.redirect(`/store/${sellerId}`);
    } catch (err) {
      console.error(err);
    }
  },
  showBouquet: async (req, res) => {
    try {

      const bouquetId = req.session.bouquetId;
      console.log("컨트롤러에서 꽃다발id 확인: " + bouquetId);
      //const sellerId = req.session.sellerId;
      const bouquetItems = await bouquetModel.getBouquetItems(bouquetId);
      console.log(bouquetItems.items);
      console.log(bouquetItems.totalPrice);

      res.render('store/bouquet', { bouquetItems });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error displaying cart');
    }
  },

  //꽃다발 꽃 삭제
  deleteBouquetItems: async (req, res) => {
    try {
      //bouquetId, flowerId 받아오기
      const bouquetId = req.params.bouquetId;
      const flowerId = req.params.flowerId;

      await bouquetModel.deleteBouquetItems(bouquetId, flowerId);
      res.redirect('/bouquet');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error delete flower');
    }
  }

};
