require('dotenv').config(); // .env 파일 로드
const { db } = require('../../config/database');

// 판매자 마이페이지 조회
exports.getSellerMypage = async (req, res) => {
  const sellerId = req.session.user.id;

  try {
    const connection = await db.getConnection();

    const query = `SELECT storeName, storePhoneNumber, address_city, address_district, address_dong, address_detail, storeStatus FROM seller_info WHERE seller_id = '${sellerId}';`;

    const [results] = await connection.query(query);

    const seller = results[0];
    res.render('seller/sellerMypage', { seller, sellerId }); // 매장페이지 연결을 위한 sellerId 추가

    connection.release();
  } catch (error) {
    console.log(error);
    res.render('error', { message: '판매자 마이페이지를 불러오지 못했습니다' });
  }
};