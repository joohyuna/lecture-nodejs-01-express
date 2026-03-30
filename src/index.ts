// import 를 통해서 express 를 express라는 라이브러이에서 불러오겠다
import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRouter.ts";
import userRouter from "./routes/userRouter.ts";
import path from "path";  // 가져 온것

// 1. 환경 변수 초기화
dotenv.config();  // 프로그램이 실행되자 마자 환경변수를 불러와야 한다. 가장 먼저 준비

//2. Express 앱  생성
const app = express();  // 공장을 만드는것의 시작 물류창고라고 생각하자
app.use(express.json());   // app.use 라는 매소드는 미들웨어를 사용하게 할 때 사용 use ()

// express.static(열어줄경로) : 정작 파일들을 제공하는 미들웨어
app.use(express.static(path.join(process.cwd(), "public")));
// 미들웨어 컨베이어 벨트 지나가기 전에 일꾼에게 가기 전에 경비원, 아니면 방사선 같이 json을 사용하게 할꺼야
// express에서 json의 형식을 사용할 꺼다


//  "/" 로 들어왔을 때 동작되는 일꾼
// app.get("/", () => {}); 기본 모양임 이것으로 시작하기
app.get("/", (req, res) => {
    // res.send 는 string을 내보낼때
    // res.sendFile(파일경로) : 응답에 file내용르 달아서 전달
    // path.join(경로1, 경로2, 경로3...) : 경로를 합쳐준는 메소드
    // process.dwd() : 현재 실행중인 Node.js프로세스가 실행되는 디렉토리 경로를 반환
    res.sendFile(path.join(process.cwd(), "public", "login.html"));

});


app.get("/hello", (a, b) => {
    b.send("여기는 hello 주소로 들어왔습니다.");
});

// app.get("/" , (req, res) => {
//     res.send(`서버가 실행되었습니다. http://localhost:${process.env.PORT}`);
// });

app.use(postRouter);  // 사용할수 있게 해주는 것 공장에서 사용할수 있게
app.use(userRouter);


// 3. app.listen : 서버를 실행하는 메소드
//          매개변수 2개 (포트번호, 함수)
app.listen(process.env.PORT, () => {
    // 얘가 실행되면  처음 할일 // listen을 실행되면 이미 오픈 된다
    console.log(`서버가 실행되었습니다. http://localhost:${process.env.PORT}`);
});
// app.listen();
// app.listen(여는 포트번호, () => {
// 엶과 동시에 해야 하는 일이 있다면 여기에 작성
// });





