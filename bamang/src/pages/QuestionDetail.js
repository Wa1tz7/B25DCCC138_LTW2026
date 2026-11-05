import { Link, useNavigate, useParams } from "react-router-dom";
import { LEVELS, LETTERS, POINTS, formatScore } from "../data";

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const index = questions.findIndex((q) => q.id === Number(id));
  const question = questions[index];

  if (!question) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const prev = questions[index - 1];
  const next = questions[index + 1];

  return (
    <div>
      <h2>
        {`Câu hỏi số ${question.id} (${LEVELS[question.level]} · ${formatScore(
          POINTS[question.level]
        )})`}
      </h2>
      <p className="question-text">{question.question}</p>

      <ul className="options">
        {question.options.map((option, i) => (
          <li key={i} className={i === question.answer ? "option correct" : "option"}>
            {LETTERS[i]}. {option}
            {i === question.answer && " (Đáp án đúng)"}
          </li>
        ))}
      </ul>

      <div className="pager">
        {prev ? <Link to={`/questions/${prev.id}`}>← Câu trước</Link> : <span />}
        {next ? <Link to={`/questions/${next.id}`}>Câu sau →</Link> : <span />}
      </div>

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default QuestionDetail;