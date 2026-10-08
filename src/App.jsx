import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Nguyễn Văn An", score: 8.5, class: "D25CQCC01" },
  { id: 2, name: "Trần Thị Bình", score: 4.5, class: "D25CQCC01" },
  { id: 3, name: "Lê Hoàng Cường", score: 6.75, class: "D25CQCC02" },
  { id: 4, name: "Phạm Minh Đức", score: 9.0, class: "D25CQCC02" },
];

const App = () => {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter] = useState("all");

  const handleAdd = (newStudent) => {
  setStudents((prev) => {
    const nextId =
      prev.length > 0 ? Math.max(...prev.map(({ id }) => id)) + 1 : 1;
    return [...prev, { id: nextId, ...newStudent }];
  });
};

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter(({ score }) => {
    if (filter === "good") return score >= 8;
    if (filter === "fail") return score < 5;
    return true;
  });

  const total = students.length;
  const average =
    total > 0
      ? students.reduce((sum, { score }) => sum + score, 0) / total
      : 0;

  const filters = [
    { key: "all", label: "Tất cả" },
    { key: "good", label: "Giỏi (≥ 8)" },
    { key: "fail", label: "Trượt (< 5)" },
  ];

  return (
    <div className="container">
      <h1>Quản lý Điểm Sinh viên</h1>

      <StudentForm onAdd={handleAdd} />

      <div className="stats">
        <span>{`Tổng số sinh viên: ${total}`}</span>
        <span>{`Điểm trung bình: ${average.toFixed(2)}`}</span>
      </div>

      <div className="filters">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            className={filter === key ? "active" : ""}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <StudentList students={filteredStudents} onDelete={handleDelete} />
    </div>
  );
};

export default App;