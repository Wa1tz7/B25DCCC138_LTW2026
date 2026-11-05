import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { formatScore } from "../data";

const MESSAGES = {
  perfect: "Xuất sắc! Bạn đã trả lời đúng cả 15 câu",
  completed: "Bạn đã hoàn thành thử thách",
  nolives: "Bạn đã hết mạng",
  timeout: "Hết giờ!",
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Mở /result trực tiếp (không có state) thì về trang chủ
  if (!state) return <Navigate to="/" replace />;

  const { name, score, correctCount, livesLeft, reason } = state;

  return (
    <div className="result">
      <h2>{MESSAGES[reason]}</h2>
      <p>Người chơi: {name}</p>
      <p>Số câu trả lời đúng: {correctCount}</p>
      <p>Số mạng còn lại: {livesLeft}</p>
      <p>Điểm: {formatScore(score)}</p>

      <div className="result-buttons">
        <button onClick={() => navigate("/play")}>Chơi lại</button>
        <button onClick={() => navigate("/")}>Về trang chủ</button>
      </div>
    </div>
  );
};

export default Result;