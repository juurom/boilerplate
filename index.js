//MongoDB
//id: bbjjyy01@gmail.com
//username: juurom
//pw: uOvsMz2Lu5PGJ6g4

//backend server의 시작점

const mongoose = require('mongoose')//mongoose를 이용해 connect함
mongoose.connect('mongodb+srv://juurom:uOvsMz2Lu5PGJ6g4@boiledplate.llscnud.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('Mongodb connected...'))
.catch(err=>console.log(err))


const express = require('express') //express 모듈 가져오기
const app = express() //새로운 expree앱 만들기
const port = 5000 //백서버 포트


app.get('/', (req, res)=>res.send('Hello world!')) //현재 디렉토리에서 hello world 출력하기

app.listen(port, () => console.log(`example app listning on port ${port}!`)) //현재 앱이 port에서 실행되고 있음