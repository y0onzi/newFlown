
const db = require('../config/database').db;

exports.getSearchResults = async (city, district, neighborhood) => {


  try {
    const connection = await db.getConnection();
    const query = `
      SELECT seller_id, storeName, address_city, address_district, address_dong
      FROM seller_info
      WHERE address_city = ? AND address_district = ? AND address_dong = ?
    `;
    const results = await db.query(query, [city, district, neighborhood]);

    console.log("모델 " + results[0]);

   return results;

} catch (err) {
    console.error('검색 결과 조회 오류:', err);

  }
};

//읽어올때 seller_id 도 같이 가져와서 , 그거랑 session 에 저장해서 넘겨주라... 
// 연결경로는 /store/:sellerId <- 세션에서 읽어와서 저장하기 