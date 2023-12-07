require('dotenv').config(); 
const { db } = require('../../config/database');

// 공지사항 조회
exports.getNotices = async (req, res) => {
  try {
    const sellerId = req.session.user.id;

    const query = 'SELECT * FROM notice WHERE seller_id = ?;' 
    const values = [sellerId];

    const [rows] = await db.query(query, values);
    const notices = rows;

    res.render('seller/notices', { notices }); 
    console.log("공지사항 목록 조회 성공!");
  } catch (error) {
    console.log(error);
    res.render('error', { message: '공지사항 목록을 불러오지 못했습니다' });
  }
};


// 공지사항 등록
exports.addNotice = async (req, res) => {
  try {
    const sellerId = req.session.user.id;
    const { title, content } = req.body;

    const query= 'INSERT INTO notice (title, content, seller_id, date) VALUES (?, ?, ?, NOW())';  
    const values = [title, content, sellerId];

    const [rows] = await db.query(query,values);
    const notices = rows;
    
    res.redirect('/seller/notices'); 
    console.log("공지사항 등록 성공!");
  } catch (error) {
    console.log(error);
    res.render('error', { message: '공지사항을 등록하지 못했습니다' });
  }
};
