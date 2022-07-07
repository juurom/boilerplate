const {User} = require('../models/User');

let auth=(req, res, next)=>{ //인증처리 진행
    //클라이언트 쿠키에서 토큰을 가져온다. <=cookieparser이용
    //user가 있으면 인증ㅇㅋ 없으면ㄴㄴ

    let token = req.cookies.x_auth;
    User.findByToken(token, (err, user)=>{
        if (err) throw err;
        if(!user) return res.json({isAuth: false, error: true})
        req.token = token; //req에 token과 user를 넣어주는 이유: token과 user를 req에 넣어줌으로서 index.js에서 접근가능하게 하기 위해
        req.user = user;
        next(); //미들웨어를 성공적으로 수행하면 다음 단계로 진행
    });
}

module.exports = {auth};
