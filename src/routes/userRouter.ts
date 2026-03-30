import express from "express";
import path from "path";

const router = express.Router();   // alt + enter express 아무데나 커서 놓고

const mockUsers = [
    {id: 1, email: "admin@test.com", password: "password123", name: "관리자"},
    {id: 2, email: "user@test.com", password: "1234", name: "일반유저"},
];

router.get("/users/login", (req, res) => {
    // const email = req.query.email;
    // const password = req.query.password;
    // req.query는 객에에서 1개이상의 프로퍼티 값을 뽕아로여 한다면
    const { email, password } = req.query;  // 쿼리 스트링으로 들어온값을 꺼내는 방법
    // res.send(`email: ${email}, password: ${password}`);

    const successPage = path.join(process.cwd(), "public", "success.html");
    const failPage = path.join(process.cwd(), "public", "fail.html");

    // 0. 로그인 이 있으니 먼저 메일 확인
    // 1. email과 password가 둘다 도착이 됐는지  -> 성공, 실패
    // 값이 있는지 없는지 판별
    if (!email || !password) {
        return res.sendFile(failPage);
    }

    // 2. email로 값을 찾았을때 있는지           -> 성공, 실패
    // 그 중에 들어온 값중 고유값 으로 검색 (id값은 고유값)
    const user = mockUsers.find((value) => {
        return value.email === email;
    });
    if (!user) {
        return res.sendFile(failPage);
    }


    // 3. 그 찾은 그 외원정보와 비밀번호를 비교해서 맞는지  -> 성공, 실패
    // 더 비교할 값이 있으면 그걸로 일치하는지 확인
    if (user.password !== password) {
        return res.sendFile(failPage);
    }
    res.sendFile(successPage);
});
// router.get("/users/login", (req, res) => {
//     res.send("로그인 페이지");
// });

export default router;
