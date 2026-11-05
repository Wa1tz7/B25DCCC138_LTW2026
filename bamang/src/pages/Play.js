import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LETTERS, MAX_LIVES, TOTAL_TIME } from "../data";
import { calcScore } from "../utils";
import QuestionCard from "../components/QuestionCard";
import StatusBar from "../components/StatusBar";
import ProgressBar from "../components/ProgressBar";
import Helpers from "../components/Helpers";

const Play = ({ questions, playerName, addHistory }) => {
  const navigate = useNavigate();
  const total = questions.length;

  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [status, setStatus] = useState("answering");
  const [selected, setSelected] = useState(null);
  const [hidden, setHidden] = useState([]);
  const [used, setUsed] = useState({ fifty: false, skip: false, life: false });
  const finished = useRef(false);

  const question = questions[index];
  const { score, streak } = calcScore(results, questions);

  const finish = (finalResults, finalLives, reason) => {
    if (finished.current) return; 
    finished.current = true;
    const { score: finalScore } = calcScore(finalResults, questions);
    const correctCount = finalResults.filter((r) => r === "correct").length;
    addHistory({
      name: playerName,
      score: finalScore,
      correctCount,
      livesLeft: finalLives,
    });
    navigate("/result", {
      replace: true,
      state: {
        name: playerName,
        score: finalScore,
        correctCount,
        livesLeft: finalLives,
        reason,
      },
    });
  };

  const advance = (newResults, newLives) => {
    if (newLives === 0) return finish(newResults, newLives, "nolives");
    if (index === total - 1) {
      const perfect = newResults.every((r) => r === "correct");
      return finish(newResults, newLives, perfect ? "perfect" : "completed");
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setHidden([]); 
    setStatus("answering");
  };

  const handleSelect = (i) => {
    if (status !== "answering") return;
    setSelected(i);
    setStatus("locked");
  };

  const handleFifty = () => {
    const wrongs = [0, 1, 2, 3].filter((i) => i !== question.answer);
    const toHide = [...wrongs].sort(() => Math.random() - 0.5).slice(0, 2);
    setHidden(toHide);
    setUsed((u) => ({ ...u, fifty: true }));
  };

  const handleSkip = () => {
    const newResults = [...results, "skipped"];
    setResults(newResults);
    setUsed((u) => ({ ...u, skip: true }));
    advance(newResults, lives);
  };

  const handleLife = () => {
    setLives((l) => Math.min(l + 1, MAX_LIVES));
    setUsed((u) => ({ ...u, life: true }));
  };

  useEffect(() => {
    if (status === "locked") {
      const timer = setTimeout(() => {
        const isCorrect = selected === question.answer;
        setResults((r) => [...r, isCorrect ? "correct" : "wrong"]);
        if (!isCorrect) setLives((l) => l - 1);
        setStatus("revealed");
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (status === "revealed") {
      const timer = setTimeout(() => advance(results, lives), 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status !== "answering") return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (timeLeft <= 0) finish(results, lives, "timeout");
  }, [timeLeft]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (i === -1 || hidden.includes(i)) return;
      handleSelect(i); // handleSelect đã tự kiểm tra status === "answering"
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, hidden]);

  useEffect(() => {
    document.title = `Câu ${index + 1}/${total} – còn ${lives} mạng`;
  }, [index, lives, total]);

  useEffect(() => {
    return () => {
      document.title = "Thử thách 3 mạng";
    };
  }, []);

  return (
    <div className="play">
      <StatusBar timeLeft={timeLeft} lives={lives} score={score} streak={streak} />
      <ProgressBar results={results} current={index} total={total} />
      <QuestionCard
        question={question}
        index={index}
        total={total}
        selected={selected}
        status={status}
        hidden={hidden}
        onSelect={handleSelect}
      />
      <Helpers
        used={used}
        lives={lives}
        status={status}
        onFifty={handleFifty}
        onSkip={handleSkip}
        onLife={handleLife}
      />
    </div>
  );
};

export default Play;