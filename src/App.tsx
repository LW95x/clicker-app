import "./tailwind.css";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);

  const toggleTimer = () => {
    setIsPaused((prevState) => !prevState);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPaused]);

  const resetTimer = () => {
    setTime(0);
    setIsPaused(false);
  }

  const formattedTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-900">
      <form className="rounded px-8 pt-6 pb-8 mb-4">
      <label className="block text-white text-center font-bold mb-2">
        Start Time
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="time"></input>
      <label className="block text-white text-center font-bold mt-4">
        End Time
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="time"></input>
      </form>
      <div className="text-white text-4xl font-bold">
        Time Lost: {formattedTime(time)}
      </div>
      <button
        onClick={toggleTimer}
        className="bg-zinc-800 hover:bg-gray-700 text-white font-bold py-4 px-32 rounded my-5"
      >
        {isPaused ? "Resume Working" : "I Got Distracted"}
      </button>
      <button onClick={resetTimer} className="px-16 py-3 bg-red-500 text-white rounded-lg text-lg focus:outline-none">
        Reset
      </button>
    </div>
  );
}

export default App;
