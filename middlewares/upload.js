// middlewares/upload.js

const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 파일이 저장될 경로
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension); // 파일명 설정
  },
});

//const upload = multer({ storage });
const upload = multer({ dest: 'uploads/' });
module.exports = upload;
