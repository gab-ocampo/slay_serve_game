import React, { useState, useEffect } from 'react';
import './App.css';

const imageUrls = [
  'https://ih1.redbubble.net/image.5009777471.1151/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg', // Slay
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkyK8FCm1oTEwFJzC5De-pKu0BBES6lrX-w&s' // Serve
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [assignedImages, setAssignedImages] = useState([]);
  const [revealed, setRevealed] = useState(Array(36).fill(false));

  useEffect(() => {
    const imgs = [...Array(18).fill(imageUrls[0]), ...Array(18).fill(imageUrls[1])];
    setAssignedImages(shuffle(imgs));
  }, []);

  const handleClick = (index) => {
    if (revealed[index]) return;
    setRevealed(prev => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });
  };

  if (assignedImages.length === 0) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      <h1 className="title">Slay or Serve?</h1>
      <div className="grid">
        {Array.from({ length: 36 }, (_, index) => (
          <div
            key={index}
            className={`tile ${revealed[index] ? 'revealed' : ''}`}
            onClick={() => handleClick(index)}
            style={revealed[index] ? { backgroundImage: `url(${assignedImages[index]})` } : {}}
          >
            {!revealed[index] && <span>{index + 1}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
