//middlewares/auth.js

// 사용자가 로그인 되어 있는지 확인 (인증 확인)
exports.ensureAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/login');
};
