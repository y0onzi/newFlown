// module.exports = (req, res, next) => {
//     const buyerId = req.session.buyer_id;
  
//     if (!buyerId) {
//       return res.redirect('/user/login'); // 로그인 페이지로 리다이렉트
//     }
  
//     next(); // 다음 미들웨어로 이동
//   };
  

//   module.exports = (req, res, next) => {
//     if (!req.session.user) {
//       // 로그인되어 있지 않은 경우
//       return res.render('user/login', { message: '로그인을 하시고 이용해주세요.' });
//     }
//     next();
//   };

module.exports = (req, res, next) => {
    if (!req.session.user) {
      // 로그인되어 있지 않은 경우
      return res.status(401).send('<script>alert("로그인을 하시고 이용해주세요."); window.location.href = "/user/login";</script>');
    }
    next();
  };
  
  