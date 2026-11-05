const BUILD_TAG = "tm-6852";
/* eslint-disable import/first */
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Result from "./pages/Result";
import History from "./pages/History";
import QuestionBank from "./pages/QuestionBank";
import QuestionDetail from "./pages/QuestionDetail";
import NotFound from "./pages/NotFound";

const STORAGE_KEY = "ltw_3mang_history";

const loadHistory = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    console.info(BUILD_TAG);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/data/questions.json", { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addHistory = (record) => {
    const entry = {
      id: Date.now(),
      playedAt: new Date().toLocaleString("vi-VN"),
      ...record,
    };
    setHistory((h) => [...h, entry]);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route
          index
          element={
            <Home
              playerName={playerName}
              setPlayerName={setPlayerName}
              history={history}
            />
          }
        />
        <Route
          path="play"
          element={
            playerName.trim() ? (
              <Play
                questions={questions}
                playerName={playerName}
                addHistory={addHistory}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="result" element={<Result />} />
        <Route
          path="history"
          element={<History history={history} onClear={() => setHistory([])} />}
        />
        <Route path="questions" element={<QuestionBank questions={questions} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;