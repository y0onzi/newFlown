const db = require('../../config/database').db;
const upload = require('../../middlewares/upload');

// 상품 목록 조회
exports.getFlowers = async (req, res) => {
  try {
    const sellerId = req.session.user.id;

    const query = 'SELECT name, color, price, isSoldOut FROM flower WHERE seller_id = ?';
    const values = [sellerId];

    const [rows] = await db.query(query, values);
    const flowers = rows;

    res.render('seller/flowers', { flowers });
    console.log("상품 목록 조회 성공!");
  } catch (error) {
    console.log(error);
    res.render('error', { message: '상품 목록을 불러오지 못했습니다' });
  }
};

// 상품 등록
exports.addFlower = async (req, res) => {
  try {
    const sellerId = req.session.user.id;
    const { name, price, color } = req.body;
    const isSoldOut = req.body.isSoldOut === 'on' ? 1 : 0;
    /*
    let photo = null;

    if (req.file) {
      photo = req.file.filename;
    }
    */

    const insertQuery = 'INSERT INTO flower (name, price, color, isSoldOut, seller_id) VALUES (?, ?, ?, ?, ?)';  
    const insertValues = [name, price, color, isSoldOut, sellerId];

    await db.query(insertQuery, insertValues);

    console.log("상품 등록 성공!");

    res.redirect('/seller/flowers');
  } catch (error) {
    console.log(error);
    res.render('error', { message: '상품을 등록하지 못했습니다' });
  }
};