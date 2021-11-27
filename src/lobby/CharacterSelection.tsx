import React, { useState} from "react";

interface Composer {
  name: string;
  sprite: string;
}

const composers: Composer[] = [
  { name: "Beethoven", sprite: "" },
  { name: "Mozart", sprite: "" },
];

export function CharacterSelection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const composer = composers[selectedIndex];

  const cycleLeft = () => {
    let newIndex = selectedIndex - 1;
    if (newIndex < 0) {
      newIndex = composers.length - 1;
    }
    setSelectedIndex(newIndex);
  };
  const cycleRight = () => {
    let newIndex = selectedIndex + 1;
    if (newIndex >= composers.length) {
      newIndex = 0;
    }
    setSelectedIndex(newIndex);
  };

  return <div>
    <h2>Select Composer</h2>
    <p>{composer.name}</p>
    <button onClick={cycleLeft}>Left</button>
    <button onClick={cycleRight}>Right</button>
    <button>Let's Battle!</button>
  </div>;
}