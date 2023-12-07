const router = require('express').Router();
const userController = require('../../controllers/user/userController');
const { body, validationResult } = require('express-validator');
const userDao = require('../../models/User');

const registerBuyerValidation = [
    body('id').custom(async(value)=>{
        const nicknameCount = await userDao.checkBuyerIdDuplicate(value);
        if(nicknameCount > 0){
            throw new Error('아이디가 중복되었습니다.');
        }
        return true;
    }),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }
        return true;
      })
]

const registerSellerValidation = [
  body('id').custom(async(value)=>{
    const nicknameCount = await userDao.checkSellerIdDuplicate(value);
    if(nicknameCount > 0){
        throw new Error('아이디가 중복되었습니다.');
    }
    return true;
}),
body('password2').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    return true;
  })
]

router.get('/user/register/entry', (req,res)=>{
    res.render('user/registerEntry');
  })

router.get('/user/register/buyer', (req,res)=>{
  res.render('user/registerBuyer');
})

router.get('/user/register/seller', (req,res)=>{
  res.render('user/registerSeller');
})

router.post('/user/register/buyer',registerBuyerValidation, userController.registerBuyer);

router.post('/user/register/seller', registerSellerValidation, userController.registerSeller);

router.get('/user/login', (req,res)=>{
  res.render('user/login');
})

router.get('/user/loginSuccess', (req,res)=>{
    res.render('user/loginSuccess');
  })

router.post('/user/login', userController.login);

router.get('/user/logout', userController.logout);


module.exports = router;