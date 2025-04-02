import { useState } from "react";
import "./App.css";

const context = new AudioContext();
const osc = context.createOscillator();
const amp = context.createGain();

osc.connect(amp);
amp.connect(context.destination);

osc.start();

function App() {
  const [running, setRunning] = useState(false);

  const updateValues = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const freq = (e.clientX / window.innerWidth) * 1000;
    const gain = e.clientY / window.innerHeight;

    osc.frequency.value = freq;
    amp.gain.value = gain;
  };

  const toggleAudio = () => {
    if (context.state === "suspended") {
      context.resume().then(() => {
        setRunning(true);
      });
    }
    if (context.state === "running") {
      context.suspend().then(() => {
        setRunning(false);
      });
    }
  };
  return (
    <div style={{ width: "100vw", height: "100vh" }} onMouseMove={updateValues}>
      <button onClick={toggleAudio}>{running ? "🔊" : "🔇"}</button>
    </div>
  );
}

export default App;
