import { useState } from "react";

const StudentForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedClass = className.trim();
    const numScore = Number(score);

    if (!trimmedName || !trimmedClass || score.trim() === "") {
      setError("Vui lòng nhập đầy đủ Họ tên, Điểm số và Lớp!");
      return;
    }
    if (Number.isNaN(numScore) || numScore < 0 || numScore > 10) {
      setError("Điểm số phải là số từ 0 đến 10!");
      return;
    }

    onAdd({ name: trimmedName, score: numScore, class: trimmedClass });
    setName("");
    setScore("");
    setClassName("");
    setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        step="0.01"
        placeholder="Điểm số"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />
      <input
        type="text"
        placeholder="Lớp"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <button type="submit">Thêm</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default StudentForm;