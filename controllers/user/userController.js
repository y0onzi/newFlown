const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const userDao = require('../../models/User');

const userController = {

  registerBuyer: async (req, res) => {
    try {
      const errorMessages = {};
      const result = validationResult(req);
      if (!result.isEmpty()) {

        result.array().forEach(error => {
          errorMessages[error.path] = error.msg;
        });
        console.log(errorMessages);
        res.render('user/registerBuyer',
          {
            errors: errorMessages,
            formData: req.body
          });
        return;
      }

      const { id, password, name, phoneNumber } = req.body;

      // 비밀번호 암호화
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 유저 등록
      userDao.registerBuyer(id, hashedPassword, name, phoneNumber);
      res.redirect('/user/loginSuccess');
    } catch (error) {
      res.render('error', { message: '회원가입 오류가 발생했습니다.' });
    }
  },

  registerSeller: async (req, res) => {
    try {
      const errorMessages = {};
      const result = validationResult(req);

      if (!result.isEmpty()) {
        result.array().forEach(error => {
          errorMessages[error.path] = error.msg;
        });
        res.render('user/registerSeller',
          {
            errors: errorMessages,
            formData: req.body
          });
        return;
      }

      const { id, password, storeName, ownerName, businessNumber, storePhoneNumber,
        address_city, address_district, address_dong, address_detail } = req.body;

      // 비밀번호 암호화
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 유저 등록
      userDao.registerSeller(id, hashedPassword, storeName, ownerName, businessNumber, storePhoneNumber, address_city, address_district, address_dong, address_detail);
      res.redirect('/user/loginSuccess');
    } catch (error) {
      res.render('error', { message: "회원가입 오류가 발생했습니다." });
    }
  },

  login: async (req, res) => {
    // console.log(req.body);
    //로그인 성공, 실패 여부 
    try {
      const { id, password, user } = req.body;

      let hashedPassword;
      if (user == "개인로그인") {
        hashedPassword = await userDao.loginBuyer(id);
      } else if (user == "사업자로그인") {
        hashedPassword = await userDao.loginSeller(id);
      }

      if (hashedPassword === null) {
        res.render('user/login', { errors: "로그인에 실패하였습니다." });
      } else {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        console.log(isPasswordValid);

        if (isPasswordValid) {
          console.log("로그인 성공");

          if (user == "개인로그인") {
            req.session.user = {
              user: "buyer",
              id: id,
              loggedIn: true
            };
          } else if (user == "사업자로그인") {
            req.session.user = {
              user: "seller",
              id: id,
              loggedIn: true
            };
          }
          // 세션 데이터 저장
          req.session.save((err) => {
            if (err) {
              console.error('Failed to save session:', err);
              res.render('error', { message: "로그인에 실패하였습니다." });
            } else {
              console.log('Session saved successfully');
              res.redirect('/user/loginSuccess');
            }
          });

        } else {
          res.render('user/login', { errors: "로그인에 실패하였습니다." });
        }
      }
    } catch (error) {
      res.render('user/login', { errors: "로그인에 실패하였습니다." });
    }
  },

  logout: async (req, res) => {
    try {
      if (req.session.user) {
        console.log('로그아웃 처리');
        req.session.destroy(
          function (err) {
            if (err) {
              console.log('세션 삭제시 에러');
              //throw createError(500, 'Failed to delete session');
              res.render('error', { message: "로그아웃에 실패하였습니다." });
            }
            console.log('세션 삭제 성공');
            res.redirect('/user/login');
          }
        );
      }
    } catch (error) {
      res.render('error', { message: "로그아웃에 실패하였습니다." });
    }
  }
}
module.exports = userController;