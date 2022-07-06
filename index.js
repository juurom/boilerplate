//MongoDB
//id: bbjjyy01@gmail.com
//username: juurom
//pw: T3mJ1BLH6WSXlClA


//* backend server의 시작점
const express = require('express') //express 모듈 가져오기
const app = express() //새로운 expree앱 만들기
const port = 5000 //백서버 포트
const bodyParser = require('body-parser'); //bodyparser가져오기
const cookieParser = require('cookie-parser');//cookieparser, cookie에 저장할 때 사용
const { User } = require("./models/User"); //models/user에서 user객체 가져오기
//bodyparser: client에서 오는 정보를 server가 분석할 수 있게 해줌
//20220706 어 근데 강의댓글보니까 업데이트돼서 안써도된대

const config = require("./config/key");

//application/x-www-form-urlencoded <= 이렇게 된 데이터를 분석해서 가져올 수 있게
//app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended:true}))
//json <=json 타입의 데이터
app.use(bodyParser.json()); //<<bodyparser로 json받기... 
//app.use(express.json())
app.use(cookieParser());

const mongoose = require('mongoose')//mongoose(mongodb를 쉽게 이용할 수 있는 tool)를 이용해 connect함
mongoose.connect(config.mongoURI)
.then(()=>console.log('Mongodb connected...'))
.catch(err=>console.log(err))


app.get('/', (req, res)=>res.send('Hello world hihihi')) //현재 디렉토리에서 hello world 출력하기


// <1> register route
app.post('/register', (req, res)=>{//post 메소드, route의 엔드포인트는 /register, callback function의 인자로 req, res
 //회원가입할 때 필요한 정보들을 client에서 가져오면
 //그것을 database에 넣어준다.
    const user = new User(req.body);
    //req.body에 User정보가 들어 있음
    //bodyparser가 정보를 받아줌
    //ex User {name: juurom, email: bbjjyy01@gmail.com, ...}
    

    //save 하기전 비밀번호 암호화
    user.save((err, userInfo)=>{
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    }) //mongodb 메소드
        //error 실패 정보 전달, 성공 시 res.status(200)로 성공 정보 전달

})

//<2> login route
app.post('/login', (req, res)=>{
    //(1)요청된 이메일을 데이터베이스에서 찾는다
    //findOne: mongodb에서 제공하는 탐색 메소드
    User.findOne({email: req.body.email}, (err, userinfo)=>{
        if(!userinfo) {return res.json({
            loginSuccess: false,
            message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //(2)이메일이 있다면 비밀번호가 같은지 확인한다
        userinfo.comparePassword(req.body.password, (err, isMatch) =>{
            if (!isMatch){
                return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})
                }
            else{
                userinfo.generateToken((err, user)=>{
                if(err) return res.status(400).send(err);
                //토큰을 저장해야 함. 쿠키, 로컬스토리지, ...
                //여러 가지 방법이 있지만 여기서는 쿠키에 저장함
                res.cookie("x_auth", user.token)
                //개발자도구-application-cookie에 저장됨
                .status(200)
                .json({loginSuccess: true, userId: user._id})
                })
            }
        })
    })
    //(3)비밀번호가 맞다면 유저를 위한 토큰을 생성한다
})

app.listen(port, () => console.log(`example app listning on port ${port}!`)); //현재 앱이 port에서 실행되고 있음