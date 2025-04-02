import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

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
    <div
      className="w-screen h-screen flex justify-center items-center"
      onMouseMove={updateValues}
    >
      <Button onClick={toggleAudio}>{running ? "🔊" : "🔇"}</Button>
    </div>
  );
}

export default App;
