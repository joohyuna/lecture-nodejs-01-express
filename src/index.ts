// import 를 통해서 express 를 express라는 라이브러이에서 불로오겠다
import express from "express";
import dotenv from "dotenv";

// 1. 환경 변수 초기화
dotenv.config();  // 프로그램이 실행되자 마자 환경변수를 불러와야 한다. 가장 먼저 준비

//2. Express 앱  생성
const app = express();  // 공장을 만드는것의 시작 물류창고라고 생각하자
app.use(express.json());   // app.use 라는 매소드는 미들웨어를 사용하게 할 때 사용 use (rmsid )
// 미들웨어 컨베이어 벨트 지나가기 전에 일꾼에게 가기 전에 경비원, 아니면 방사선 같이 json을 사용하게 할꺼야
// 데이터베이스가 없어서 임시로 만든 데이터 변수 (mock)
const mockPosts = [  // 글 목록을 주는 api
    { id: 1, title: "첫 번째 택배", content: "무사히 도착했습니다." },
    { id: 2, title: "두 번째 택배", content: "파손 주의해주세요!" },
    { id: 3, title: "세 번째 택배", content: "문 앞에 두고 가주세요." },
];

//  "/" 로 들어왔을 때 동작되는 일꾼
// app.get("/", () => {}); 기본 모양임 이것으로 시작하기
app.get("/", (req, res) => {
    // res.send 는 string을 내보낼때
    res.send("여기는 루트입니다.");
});

app.get("/posts", (req, res) => {
   // res.json(보낼데이터) 메소드 : string이 아닌, 객체 타입의 데이터 (단, 함수 빼고)를 보낼 때 사용
    // res.json 메소드를 사용하려면 app.use(express.json()) 을 꼭 써줘야 한다.
    res.json(mockPosts);
});

app.get("/hello", (a, b) => {
    b.send("여기는 hello 주소로 들어왔습니다.");
});

// app.get("/" , (req, res) => {
//     res.send("<h1>서버가 실행되었습니다.</h1><div>http://localhost:3000</div>");
// });

// 3. app.listen : 서버를 실행하는 메소드
//          매개변수 2개 (포트번호, 함수)
app.listen(process.env.PORT, () => {
    // 얘가 실행되면  처음 할일
    console.log(`서버가 실행되었습니다. http://localhost:${process.env.PORT}`);
});





