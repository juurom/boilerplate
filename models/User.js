const mongoose = require('mongoose') //mongoose 모듈 가져오기

const userSchema = mongoose.Schema({ //mongoose로 스키마 만들기
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //space 지워주는 역할 (bbjjyy 01 @gmail.com -> bbjjyy01@gmail.com)
    },
    password:{
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    }
})

const User = mongoose.model('User', userSchema) //모델에 만든 스키마 넣기

module.exports = {User}//다른 곳에서도 유저 모델과 스키마 쓸 수 있게 하기 <<<<<<시발왜안돼?