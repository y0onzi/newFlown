const express = require('express');
const app = express();
const db = require('./config/database');
//require("dotenv").config();
const layouts= require("express-ejs-layouts");

app.use(express.static('public'));


app.set('port', process.env.PORT || 80);

const database = require('./database/database');

//===============라우터 추가============================//
const mainRouter = require('./routes/main/mainRouter');

const userRouter = require('./routes/user/userRouter');
const buyerRouter = require('./routes/buyer/buyerRouter');
const ordersRouter = require('./routes/orders/ordersRouter');

const searchRouter = require('./routes/map/searchRoute'); // 가게 검색 라우터

// app.use(searchRouter);  // 가게 검색 라우터
const storeRouter = require('./routes/store/storeRouter'); // 가게 상세 페이지
// app.use(storeRouter);



const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

app.use(layouts);
app.use(express.static('public'));

var sessionStore = new MySQLStore(database.options);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
}));

//애플리케이션과 템플릿 엔진의 연결
app.set('view engine', 'ejs');
app.set('views', './views');


//===================라우터 연결================//
app.use(express.urlencoded({
    extended: false
  }));
app.use(express.json());

app.use((req, res, next) => {
  if (typeof req.session.user !== 'undefined' && req.session.user.loggedIn) {
    res.locals.user = req.session.user; 
    res.locals.hideLoginSignup = true;
  } else {
    res.locals.user = undefined; 
    res.locals.hideLoginSignup = false;
  }
  next();
});


//=====app.use 정리=====//
app.use(mainRouter);
app.use(userRouter);
app.use(buyerRouter);
app.use(ordersRouter);
app.use(searchRouter);  // 가게 검색 라우터
app.use(storeRouter);


app.use(searchRouter);  // 가게 검색 라우터
app.use(storeRouter);



//---판매자 마이페이지 관련---
const multer = require('multer');
const bodyParser = require('body-parser');
const sellerMypageRouter = require('./routes/seller/sellerMypage.route');
const flowersRouter = require('./routes/seller/flowers.route');
const sellerOrdersRouter = require('./routes/seller/sellerOrders.route');
const noticesRouter = require('./routes/seller/notices.route');

// 미들웨어 등록
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sellerMypageRouter);
app.use(flowersRouter);
app.use(sellerOrdersRouter);
app.use(noticesRouter);

//---판매자 마이페이지 끝---


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
});