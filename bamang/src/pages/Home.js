import { useNavigate } from "react-router-dom";
import { formatScore } from "../data";

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const top = history.reduce(
    (best, h) => (!best || h.score > best.score ? h : best),
    null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/play");
  };

  return (
    <div>
      <h2>Thử thách 3 mạng</h2>

      {top && <p className="record">{`Kỷ lục: ${formatScore(top.score)} – ${top.name}`}</p>}

      <ul className="rules">
        <li>15 câu hỏi, trả lời lần lượt; có 3 mạng và 90 giây cho cả lượt chơi.</li>
        <li>Trả lời đúng được điểm theo mức độ; đúng từ câu thứ 3 liên tiếp được thưởng thêm.</li>
        <li>Trả lời sai mất 1 mạng nhưng vẫn đi tiếp.</li>
        <li>Lượt chơi kết thúc khi hết câu, hết mạng hoặc hết giờ.</li>
        <li>Có 3 quyền trợ giúp: 50:50, Bỏ qua, Thêm 1 mạng. Mỗi quyền dùng một lần.</li>
      </ul>

      <form onSubmit={handleSubmit} className="start-form">
        <label>
          Tên người chơi:{" "}
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!playerName.trim()}>
          Bắt đầu
        </button>
      </form>
    </div>
  );
};

export default Home;