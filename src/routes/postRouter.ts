import express from "express";  // 외부에 있는 객체를 가져오는것

// import => 외부에 있는 걸 끌어와서 내가 사용하는거
//        => 외부에서 내보내는게 있다
// export =>

const router = express.Router(); // 라우터를 새로 만들어 줌

// 데이터베이스가 없어서 임시로 만든 데이터 변수 (mock)
const mockPosts = [  // 글 목록을 주는 api
    { id: 1, title: "첫 번째 택배", content: "무사히 도착했습니다." },
    { id: 2, title: "두 번째 택배", content: "파손 주의해주세요!" },
    { id: 3, title: "세 번째 택배", content: "문 앞에 두고 가주세요." },
];

router.get("/posts", (req, res) => {
    // res.json(보낼데이터) 메소드 : string이 아닌, 객체 타입의 데이터 (단, 함수 빼고)를 보낼 때 사용
    // res.json 메소드를 사용하려면 app.use(express.json()) 을 꼭 써줘야 한다.
    res.json(mockPosts);
});

// /posts => 글몰록 출록
// 글 1개를 출력해줄때 필요할 주소
// 경로를 "/"로 나눴을때,
// /posts까지는 정해져 있고, 그뒤 경로가 어떤값이 들어갈지 오를때
// ":" 를 붙이고, 이름표를 붙여줌 => id라고 하는 이름을 붙여준다.
// 예) /posts/1 => 여기에 걸리고, id가 1
// 예) /posts/300 => 여기에 걸리고, id가 300  // 주소는 모두 문자이다
router.get("/posts/:id", (req, res) => {
    // 이렇게 가져온 저 "id"라는 겂은
    // req.params.id 안에 있음
    // Number 숫자로 변환을 해줘야함
    const targetId = Number(req.params.id);
    // 1. 숫자값이 들어왔으면 정상적으로 형변환
    // 2. 문자값이 들어왔으면 NaN이 targetId에 저장되겠네?

    // 1. 정상
    // targetId를 가지고, mockPosts에서 행당하는 글 맥겣를 찾아서 빈 박스에 넣어야함
    const result = mockPosts.find((value) => {
        // 첫순회 : value = {id: 8, title: "...", content: "..."}
        // 2순회 : value = {id: 3, title: "...", content: "..."}
        // 3순회 : value = {id: 5, title: "...", content: "..."}
        return value.id === targetId;
        // 일치하는 게 있으며 그 value가 반환되고, 없으면 undefined
        // 자바스크립트엔진이 찾았는데 어쩔수 없이 값이 없을때 반환 한거라서 undefined 가 반환
    });
    // 1-1. 값이 반환 됐을 때
    // 1-2. 값이 없을 때
    if (!result) {
        // 1-2
        return res.status(404).json({message: "Posts not found"}); //에러404
        // .json은 우리가 보내는 자바스크립트 객체를 json형식으로 바꿔주는 일
        // 우리가 json() 안에 매개변수에 넣어준것, 자바스크립트 객체 => JSON문법을 써서 쓰는게 아니라 , js 문법을 써서 끔
    }
    // 1-1
    res.json({data: result});
});

export default router;  // 사용할수 있게 내보낸것