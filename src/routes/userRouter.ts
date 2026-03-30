// 1. 모듈 불러오기
import express from "express";  // 서버 공장을 만들기 위한 라이브러리 Express불러오기
import path from "path";  // 파일 안전하게 확인할수 있는 Node.js 기본 모둘

// 2. 라우터 생성
const router = express.Router();  // 주소별 기능을 나누는 공장의 기능별 주소

// 3. 가상 DB 만들기
const mockUsers = [
    {id: 1, email: "admin@test.com", password: "password1234", name: "관리자"},
    {id: 2, email: "user@test.com", password: "1234", name: "일반유저"},
];

//
router.get("/users/login", (req, res) => {
    const {email, password} = req.query;

    const successPage = path.join(process.cwd(), "public", "success.html");
    const failPage = path.join(process.cwd(), "public", "fail.html");

    //1. email, password 둘다 도착했는지 확인 -> 성공, 실패
    if (!email || !password) {
        return res.sendFile(failPage);
    }
    // 2. email로 값을 찾았을 때 있는 지    -> 성공, 실패
    const user = mockUsers.find((value) => {
        return value.email === email;
    });
    if (!user) {
        return res.sendFile(failPage);
    }
    // 3. 찾은 회원정보와 비밀번호를 비교해서 맞는지 -> 성공, 실패
    if (user.password !== password) {
        return res.sendFile(failPage);
    }
    return res.sendFile(successPage);
});

export default router; //
