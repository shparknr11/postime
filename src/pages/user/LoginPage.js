import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/login.css";
import axios from "axios";
import { postSignIn } from "../../apis/user/apiuser";
import UserModal from "../../components/UserModal";

const LoginPage = ({ setIsLogin, setUserInfo }) => {
  const navigate = useNavigate();


  // const [userId, setUserId] = useState("mybirth811");
  // const [userPass, setUserPass] = useState("Test!@#$1234");

  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  // 모달 추가
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalTitle, setUserModalTitle] = useState(false);
  const [userModalMessage, setUserModalMessage] = useState("");
  const [userModalOnConfirm, setUserModalOnConfirm] = useState(() => () => {});

  const handleSubmit = async e => {
    // 새로고침 막기
    e.preventDefault();

    // 로그인 API
    const result = await postSignIn({ userId, userPass });
    console.log(result);
    if (result.statusCode !== 2) {
      setUserModalMessage(result.resultMsg);
      setUserModalOpen(true);
      // setUserInfo({});
      return;
    }
    setUserInfo(result.resultData);

    // 로그인 상태로 변경
    setIsLogin(true);

    // 로컬 스토리지에 저장
    // sessionStorage.setItem("userId", userId);
    // sessionStorage.setItem(
    //   "memberInfo",
    //   JSON.stringify({
    //     userId: "userId",
    //     Name: "userName",
    //     email: "userEmail",
    //   }),
    // );
    // 원래 하던거 (배열로)
    // sessionStorage.setItem(
    //   "memberInfo",
    //   JSON.stringify({
    //     userId: userId,
    //     Name: result.resultData.name,
    //     email: result.resultData.email,
    //   }),
    // );
    // 따로 담은 거
    // 항목별로 따로 변수 저장
    // const userId = result.resultData.userId;
    // const name = result.resultData.name;
    // const email = result.resultData.email;

    sessionStorage.setItem("userId", result.resultData.userId);
    console.log("로그인 페이지의 : ", result.resultData.userId);
    sessionStorage.setItem("name", result.resultData.name);
    sessionStorage.setItem("email", result.resultData.email);

    navigate("/");
  };

  return (
    <div className="user-wrap">
      <form>
        <div className="login-header"></div>
        <div className="login-input">
          <input
            type="text"
            className="id"
            placeholder="아이디"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
          <br />
          <input
            type="password"
            className="pw"
            placeholder="비밀번호"
            value={userPass}
            onChange={e => setUserPass(e.target.value)}
          />
        </div>
        <div className="login-nav">
          <div className="login-signup">
            <Link to="/signup">회원가입</Link>
          </div>
          <div className="login-search">
            <Link to="/searchid">아이디 찾기 </Link>
            <Link to="/searchpw">
              <b>/</b> 비밀번호 찾기
            </Link>
          </div>
        </div>
        <button
          type="submit"
          className="login-button"
          onClick={event => {
            handleSubmit(event);
          }}
        >
          <span>로그인</span>
        </button>
        {/* 모달 관련 */}
        <UserModal
          isOpen={userModalOpen}
          title={"로그인 실패"}
          message={userModalMessage}
          onConfirm={userModalOnConfirm}
          buttonComment={"확인"}
        />
      </form>
    </div>
  );
};

export default LoginPage;
