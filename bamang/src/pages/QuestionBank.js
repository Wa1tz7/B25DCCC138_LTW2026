import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LEVELS, POINTS, formatScore } from "../data";

const QuestionBank = ({ questions }) => {
  const [level, setLevel] = useState("all");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleFilterShift = (e) => setKeyword(e.target.value);

  const filtered = questions.filter(
    (q) =>
      (level === "all" || q.level === Number(level)) &&
      q.question.toLowerCase().includes(keyword.toLowerCase())
  );

  const handleRandom = () => {
    const q = filtered[Math.floor(Math.random() * filtered.length)];
    navigate(`/questions/${q.id}`);
  };

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>

      <div className="toolbar">
        <label>
          Mức độ:{" "}
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="1">{LEVELS[1]}</option>
            <option value="2">{LEVELS[2]}</option>
            <option value="3">{LEVELS[3]}</option>
          </select>
        </label>

        <input
          type="text"
          placeholder="Tìm theo nội dung câu hỏi"
          value={keyword}
          onChange={handleFilterShift}
        />

        <button onClick={handleRandom} disabled={filtered.length === 0}>
          Câu ngẫu nhiên
        </button>
      </div>

      <p>Có {filtered.length} câu hỏi</p>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Điểm</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>{formatScore(POINTS[q.level])}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;