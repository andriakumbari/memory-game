// App.jsx
import React, { useState, useEffect } from "react";
import "./index.css";

function Card({ item, onClick, isFlipped }) {
  return (
    <div className="flippedWrapper" onClick={onClick}>
      <div className={`flippedCard ${isFlipped ? "active" : ""}`}>
        <div className="front">{item}</div>
        <div className="back"></div>
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("Numbers");
  const [players, setPlayers] = useState(1);
  const [gridSize, setGridSize] = useState("4x4");
  const [gameStarted, setGameStarted] = useState(false);

  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setTimerActive(false);
      alert("You win!");
    }
  }, [matchedCards]);

  const startGame = () => {
    const totalCards = gridSize === "4x4" ? 16 : 36;
    const numbers = Array.from({ length: totalCards / 2 }, (_, i) => i + 1);
    const duplicated = [...numbers, ...numbers];
    const shuffled = duplicated.sort(() => 0.5 - Math.random());

    setCards(shuffled);
    setMatchedCards([]);
    setFlippedIndex([]);
    setMoves(0);
    setTime(0);
    setTimerActive(true);
    setGameStarted(true);
  };

  const onCardClick = (index) => {
    if (flippedIndex.length === 2 || flippedIndex.includes(index)) return;
    const newFlipped = [...flippedIndex, index];
    setFlippedIndex(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatchedCards((prev) => [...prev, ...newFlipped]);
      }
      setTimeout(() => {
        setFlippedIndex([]);
      }, 1000);
    }
  };

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(1, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  if (!gameStarted) {
    return (
      <div className="app-container">
        <div className="menu-card">
          <h1 className="title">memory</h1>

          <div className="menu-section">
            <p className="section-title">Select Theme</p>
            <div className="button-group">
              <button
                className={theme === "Numbers" ? "selected" : "unselected"}
                onClick={() => setTheme("Numbers")}
              >
                Numbers
              </button>
              <button
                className={theme === "Icons" ? "selected" : "unselected"}
                onClick={() => setTheme("Icons")}
              >
                Icons
              </button>
            </div>
          </div>

          <div className="menu-section">
            <p className="section-title">Numbers of Players</p>
            <div className="button-group">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  className={players === num ? "selected" : "unselected"}
                  onClick={() => setPlayers(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <p className="section-title">Grid Size</p>
            <div className="button-group">
              <button
                className={gridSize === "4x4" ? "selected" : "unselected"}
                onClick={() => setGridSize("4x4")}
              >
                4x4
              </button>
              <button
                className={gridSize === "6x6" ? "selected" : "unselected"}
                onClick={() => setGridSize("6x6")}
              >
                6x6
              </button>
            </div>
          </div>

          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div
        className="container"
        style={{
          gridTemplateColumns:
            gridSize === "4x4" ? "repeat(4, 1fr)" : "repeat(6, 1fr)",
        }}
      >
        {cards.map((item, i) => (
          <Card
            key={i}
            item={item}
            onClick={() => onCardClick(i)}
            isFlipped={flippedIndex.includes(i) || matchedCards.includes(i)}
          />
        ))}
      </div>
      <div className="stats">
        <div className="stat-box">
          <p>Time</p>
          <h3>{formatTime(time)}</h3>
        </div>
        <div className="stat-box">
          <p>Moves</p>
          <h3>{moves}</h3>
        </div>
      </div>
    </div>
  );
}
