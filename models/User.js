//왜 자꾸 뜨는지는 잘 모르겠지만
//Error: listen EADDRINUSE: address already in use :::5000
//이 에러가 뜨면 이미 5000port가 실행중이라 또 실행시킬 수 없다는 뜻이다
//해결방법으로 kill-port를 다운받았다

const mongoose = require('mongoose') //mongoose 모듈 가져오기
const bcrypt = require('bcrypt') //bcrypt 모듈 가져오기
const saltRounds = 10; //salt의 자릿수. 암호화할 때 사용됨
const jwt = require('jsonwebtoken')

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
        maxlength: 200
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

//pre: mongoose 메소드, .save하기 전에 function을 하고, next()로 .save를 한다~
userSchema.pre('save', function(next){
    //(1) 비밀번호 암호화
    //아래 코드는 bcrypt 사이트 - usage에 있음
    //https://www.npmjs.com/package/bcrypt
    let user = this; //this는 위에 있는 userSchema를 가리킴
    if (user.isModified('password')){ //password가 수정될 때만 암호화하기
        const myPlaintextPassword = user.password;
        bcrypt.genSalt(saltRounds, function(err, salt) { //saltRound의 자릿수만큼 salt를 만듦
            if (err) return next(err)//에러가 나면 next 단계에 error를 전달해줌
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash; //hash된 비밀번호로 바꿔주기
                next();//완성됐으니 .save로 ㄱㄱ
            })
            //myPlaintextPassword: 원래비밀번호. 000123
        });
    }else{//이런... 여기서 else를 안해주면 요 아래 나오는 next가 먼저 실행돼서 hashing이 되지 않았던 것이다
        //(2) .save
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainpassword와 암호화된 비밀번호가 일치하는지 확인
    //plainPassword를 암호화한 뒤, db에 있는 비밀번호와 일치하는지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)//isMatch=true
    })
}

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해 token을 생성한다
    let user=this;
    let token=jwt.sign(user._id.toHexString(), 'secretToken')
    user.token=token;
    user.save(function(err, user){
        if (err) return cb(err);
        cb(null, user)
    })
    //user._id + 'secretToken' = token
    //token을 통해 user._id를 찾아낼 수 있음
}

userSchema.statics.findByToken = function(token, cb){
    let user = this;
    //user._id + '' = token; secretToke을 통해 복호화
    jwt.verify(token, 'secretToken', function(err, decoded){
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema) //모델에 만든 스키마 넣기

module.exports = {User}//다른 곳에서도 유저 모델과 스키마 쓸 수 있게 하기 <<<<<<시발왜안돼?