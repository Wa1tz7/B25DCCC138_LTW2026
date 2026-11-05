import { formatScore } from "../data";

const History = ({ history, onClear }) => {
  const sorted = [...history].sort(
    (a, b) => b.score - a.score || b.livesLeft - a.livesLeft
  );

  const bestScore = history.reduce((max, h) => Math.max(max, h.score), 0);
  const totalCorrect = history.reduce((sum, h) => sum + h.correctCount, 0);

  if (history.length === 0) {
    return (
      <div>
        <h2>Lịch sử</h2>
        <p>Chưa có lượt chơi nào</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Lịch sử</h2>

      <div className="stats">
        <p>Số lượt chơi: {history.length}</p>
        <p>Điểm cao nhất: {formatScore(bestScore)}</p>
        <p>Tổng số câu trả lời đúng: {totalCorrect}</p>
      </div>

      <button onClick={onClear}>Xóa lịch sử</button>

      <table className="table history-table">
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Mạng còn lại</th>
            <th>Điểm</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((h) => (
            <tr key={h.id}>
              <td>{h.name}</td>
              <td>{h.correctCount}</td>
              <td>{h.livesLeft}</td>
              <td>{formatScore(h.score)}</td>
              <td>{h.playedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;