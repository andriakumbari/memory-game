import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);
  const [timeLeft, setTimeLeft] = useState(75); // 1 min 15 sec
  const timerRef = useRef(null);

  // Shuffle and start game
  const startNewGame = () => {
    const characters = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
    ];
    const shuffled = [...characters].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setMatchedCards([]);
    setFlippedIndex([]);
    setTimeLeft(75);
  };

  // Start game on first load
  useEffect(() => {
    startNewGame();
  }, []);

  // Handle timer
  useEffect(() => {
    if (timeLeft === 0) {
      alert("⏰ Time's up! Try again.");
      startNewGame();
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [timeLeft]);

  // Win detection
  useEffect(() => {
    if (matchedCards.length === 16) {
      alert("🎉 You win!");
      startNewGame();
    }
  }, [matchedCards]);

  const onClick = (index) => {
    if (flippedIndex.length === 2 || matchedCards.includes(index)) return;

    const newIndex = [...flippedIndex, index];
    setFlippedIndex(newIndex);

    if (newIndex.length === 2) {
      if (cards[newIndex[0]] === cards[newIndex[1]]) {
        setMatchedCards((prev) => [...prev, ...newIndex]);
      }
      setTimeout(() => setFlippedIndex([]), 1000);
    }
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <button
          onClick={startNewGame}
          style={{
            padding: "10px 20px",
            background: "#fda214",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🔁 New Game
        </button>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          ⏳ {formatTime()}
        </div>
      </div>

      <div className="container">
        {cards.map((el, i) => (
          <Card
            key={i}
            item={el}
            onClick={() => onClick(i)}
            isFlipped={flippedIndex.includes(i) || matchedCards.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
