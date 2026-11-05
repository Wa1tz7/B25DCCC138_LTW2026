import { LEVELS, LETTERS, POINTS, formatScore } from "../data";
import AnswerButton from "./AnswerButton";

const QuestionCard = ({ question, index, total, selected, status, hidden, onSelect }) => {
  const getState = (i) => {
    if (status === "locked") return i === selected ? "locked" : "";
    if (status === "revealed") {
      if (i === question.answer) return "correct";
      if (i === selected) return "wrong";
    }
    return "";
  };

  return (
    <div className="question-card">
      <p className="question-meta">
        {`Câu ${index + 1}/${total} · ${LEVELS[question.level]} · ${formatScore(
          POINTS[question.level]
        )}`}
      </p>
      <p className="question-text">{question.question}</p>

      <div className="answer-grid">
        {question.options.map((option, i) => (
          <AnswerButton
            key={i}
            letter={LETTERS[i]}
            text={option}
            state={getState(i)}
            disabled={status !== "answering"}
            hidden={hidden.includes(i)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;