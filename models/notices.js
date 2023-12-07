
const db = require('../config/database');
const Notice = {};

// 공지사항 생성
Notice.createNotice = (content) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO notices (content) VALUES (?)';
    connection.query(query, [content], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
};

// 공지사항 조회
Notice.getNotices = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM notices';
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// 공지사항 수정
Notice.updateNotice = (id, content) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE notices SET content = ? WHERE id = ?';
    connection.query(query, [content, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows);
      }
    });
  });
};

// 공지사항 삭제
Notice.deleteNotice = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM notices WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.affectedRows);
      }
    });
  });
};

module.exports = Notice;
