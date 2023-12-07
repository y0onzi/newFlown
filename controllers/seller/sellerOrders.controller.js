require('dotenv').config(); 
const db = require('../../config/database').db;
const upload = require('../../middlewares/upload');

// 주문 목록 조회
exports.getOrders = async (req, res) => {
  try {
    const sellerId = req.session.user.id;

    const query = `
    SELECT oi.order_id, oi.bouquetPrice, o.orderDate, o.pickUpDate, o.orderStatus
    FROM orderItem oi
    INNER JOIN \`order\` o ON oi.order_id = o.order_id
    WHERE o.seller_id = ?
  `;
  
    const values = [sellerId];

    const [rows] = await db.query(query, values);
    const orders = rows;

    res.render('seller/sellerOrders', { orders });
    console.log("주문 목록 조회 성공!");
  } catch (error) {
    console.log(error);
    res.render('error', { message: '주문 목록을 불러오지 못했습니다' });
  }
};

// 주문서 보기
exports.sellerGetOrderSheet = async (req, res) => {
  try {
    const sellerId = req.session.user.id;
    const orderId = req.params.orderId;

    const query = `
      SELECT oi.order_id, f.name, f.price, bc.flowerAmount, (f.price * bc.flowerAmount) AS bouquetPrice, o.orderDate, o.pickUpDate, o.receiverName, o.receiverPhoneNumber, o.memo, o.orderStatus  
      FROM orderItem oi
      INNER JOIN \`order\` o ON oi.order_id = o.order_id
      INNER JOIN bouquet_configuration bc ON bc.bouquet_id = oi.bouquet_id
      INNER JOIN flower f ON f.flower_id = bc.flower_id
      WHERE o.seller_id = ?
        AND oi.order_id = ?
    `;

    const values = [sellerId, orderId];

    const [rows] = await db.query(query, values);
    const orders = rows;

    console.log(orders);
    res.render('seller/sellerOrderSheet', { orders, orderId });
  } catch (error) {
    console.log(error);
    res.render('error', { message: '오류가 발생했습니다' });
  }
};
