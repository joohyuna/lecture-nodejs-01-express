// import 를 통해서 express 를 express라는 라이브러이에서 불로오겠다
import express from "express";
import dotenv from "dotenv";

// 1. 환경 변수 초기화
dotenv.config();

//2. Express 앱  생성
const app = express();

app.get("/" , (req, res) => {
    res.send("<h1>서버가 실행되었습니다.</h1><div>http://localhost:3000</div>");
});

// 3. app.listen : 서버를 실행하는 메소드
//          매개변수 2개 (포트번호, 함수)
app.listen(3000, () => {
    // 얘가 실행되면  처음 할일
    console.log("<h1>서버가 실행되었습니다.</h1><div>http://localhost:3000</div>");
});


