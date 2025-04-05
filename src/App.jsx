import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);

  useEffect(() => {
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
    const shuffledCards = [...characters].sort(() => 0.5 - Math.random());

    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    if (matchedCards.length === 16) {
      alert("You win!");
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
      const shuffledCards = [...characters].sort(() => 0.5 - Math.random());

      setCards(shuffledCards);
      setMatchedCards([]);
    }
  }, [matchedCards]);

  const onClick = (index) => {
    if (flippedIndex.length === 2) return;
    const newIndex = [...flippedIndex, index];
    setFlippedIndex(newIndex);

    if (newIndex.length === 2) {
      if (cards[newIndex[0]] === cards[newIndex[1]]) {
        setMatchedCards((prev) => [...prev, ...newIndex]);
      }
      setTimeout(() => {
        setFlippedIndex([]);
      }, 1000);
    }
  };

  return (
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
  );
}

export default App;
