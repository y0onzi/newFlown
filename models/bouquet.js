const db = require('../config/database').db;
const validation = require('../util/validationUtils');


module.exports = {
  getBouquetById: async (bouquetId, buyerId, sellerId) => {
    try {
      const query = 'SELECT bouquet_id, is_new FROM bouquet WHERE bouquet_id = ? ';
      const [rows] = await db.query(query, [bouquetId]);
      return rows[0]; // 첫 번째 행의 데이터를 반환 (꽃다발 정보)
    } catch (err) {
      console.error(err);
    }
  },

  createBouquet: async (buyerId, sellerId, isNewValue) => {
    try {
      // 기존 꽃다발 조회
      //const existingBouquet = await this.getExistingBouquet(buyerId, sellerId);

      // 꽃다발 테이블에 꽃다발 생성
      const createBouquetQuery = 'INSERT INTO bouquet (buyer_id, seller_id, price, is_new) VALUES (?, ?, 0, ?)';
      await db.query(createBouquetQuery, [buyerId, sellerId, isNewValue]);
      console.log('꽃다발 초기화 완료!');

      // 생성된 꽃다발ID 조회
      const getBouquetIdQuery = 'SELECT LAST_INSERT_ID() AS bouquetId';
      const [rows] = await db.query(getBouquetIdQuery); //배열의 첫 번째 요소를 rows 변수에 할당
      console.log(rows);//확인
      const bouquetId = rows[0].bouquetId;

      console.log("모델에서 부케아이디 확인:" + bouquetId)
      return bouquetId;
    } catch (err) {
      console.error(err);
    }
  },

  insertToBouquet: async (bouquetId, flowerId, flowerAmount) => {
    try {

      // 해당 flowerId 유효한지 확인
      const isBouquetIdValid = await validation.validateId('flower', "flower_id", flowerId);
      if (!isBouquetIdValid) {
        throw new Error('Invalid Bouquet ID');
      }

      //해당 flowerId 유효한지 확인
      const isFlowerIdValid = validation.validateId('bouquet', "bouquet_id", bouquetId)
      if (!isFlowerIdValid) {
        throw new Error('Invalid flower ID');
      }


      // 꽃다발 구성 테이블에 꽃 추가
      // const addToBouquetQuery = 'INSERT INTO bouquet_configuration (bouquet_id, flower_id, flowerAmount) VALUES (?, ?, ?)';
      // await db.query(addToBouquetQuery, [bouquetId, flowerId, flowerAmount]);
      const addToBouquetQuery = 'INSERT INTO bouquet_configuration (bouquet_id, flower_id, flowerAmount) VALUES (?, ?, ?)';
      await db.query(addToBouquetQuery, [bouquetId, flowerId, flowerAmount]);

      //꽃다발 구성에 꽃 추가하면, 꽃다발의 is_new 속성을 false로 업데이트하기
      const updateBouquetQuery = 'UPDATE bouquet SET is_new = 1 WHERE bouquet_id = ?';
      await db.query(updateBouquetQuery, [bouquetId]);


      console.log('꽃다발에 꽃 추가 완료!');
    } catch (err) {
      console.error(err);
    }
  },
  getBouquetItems: async (bouquet_id) => {
    try {
      //const getBouquetItemsQuery = 'SELECT bc.flower_id, bc.flowerAmount, f.name, f.price, f.photo FROM bouquet_configuration bc JOIN flower f ON bc.flower_id = f.flower_id WHERE bc.bouquet_id = ? AND bc.seller_id = (SELECT seller_id FROM bouquet WHERE bouquet_id = ?);';
      //const getBouquetItemsQuery = 'SELECT bc.flower_id, bc.flowerAmount, f.name, f.price, f.photo FROM bouquet_configuration bc JOIN flower f ON bc.flower_id = f.flower_id WHERE bc.bouquet_id = ? AND f.seller_id = ?;';
      //const getBouquetItemsQuery = 'SELECT bc.flower_id, bc.flowerAmount, f.name, f.price, f.photo FROM bouquet_configuration bc JOIN flower f ON bc.flower_id = f.flower_id JOIN bouquet b ON bc.bouquet_id = b.bouquet_id WHERE b.bouquet_id = ? AND b.seller_id = ?;';
      //const getBouquetItemsQuery = `SELECT bc.flowerAmount, f.name, f.price, f.photo FROM bouquet_configuration bc JOIN flower f ON bc.flower_id = f.flower_id WHERE bc.bouquet_id = ? AND f.seller_id = ?;`;
      const getBouquetItemsQuery = `SELECT bc.flower_id, bc.flowerAmount, f.name, f.price, f.photo FROM bouquet_configuration bc JOIN flower f ON bc.flower_id = f.flower_id WHERE bc.bouquet_id = ?`;
      const [rows] = await db.query(getBouquetItemsQuery, [bouquet_id]);

      // 아이템들의 총 가격 계산
      let totalPrice = 0;
      for (const item of rows) {
        const itemPrice = item.price * item.flowerAmount;
        totalPrice += itemPrice;
      }

      console.log("꽃다발 모델 조회 : ", rows);
      console.log("장바구니 총 가격 : ", totalPrice);

      return { items: rows, totalPrice };
    } catch (error) {
      console.error(error);
      throw new Error("Error getting bouquet items");
    }
  },
  
    deleteBouquetItems: async(bouquet_id, flower_id)=>{
      try{
        let sql = "DELETE FROM bouquet_configuration WHERE bouquet_id=? AND flower_id=?";
        const [rows] = await db.query(sql,[bouquet_id, flower_id])
      }catch(error){
        console.error(error);
        throw new Error("Error delete bouquet items");
      }
    }

  }


// getExistingBouquet: async (buyerId, sellerId) => {
//   try {
//     //const query = 'SELECT bouquet_id, is_new FROM bouquet WHERE buyer_id = ? AND seller_id = ?';
//     const query = 'SELECT bouquet_id, is_new FROM bouquet WHERE buyer_id = ? AND seller_id = ?';
//     const [rows] = await db.query(query, [buyerId, sellerId]);
//     return rows; // 첫 번째 행의 데이터를 반환 (기존 꽃다발 정보)
//   } catch (err) {
//     console.error(err);
//   }
// },

