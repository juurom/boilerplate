module.exports={
    mongoURI: process.env.MONGO_URI
    //DEV 환경과 DEPLOY 환경에서 정보를 다르게 처리
    //DEPLOY환경에서는 heroku(배포사이트)에서 uri 가져옴
}