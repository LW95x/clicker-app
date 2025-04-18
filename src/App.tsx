import "./tailwind.css";
import "./App.css";
import React, { useEffect, useState } from "react";
import { networkInterfaces } from "os";

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [countdownTime, setCountdownTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isCountdownPaused, setIsCountdownPaused] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
  }

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsPaused((prevState) => !prevState);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (!isCounting || isCountdownPaused) return;
  
    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [isCounting, isCountdownPaused]);

  const resetTimer = () => {
    setTime(0);
    setIsPaused(false);
  };

  const resetCountdown = () => {
    setCountdownTime(0);
    setIsCountdownPaused(false);
  };

  const startOrPauseCountdown = () => {
    if (!isCounting) {
      const minutesInput = parseInt(String(minutes)) || 0;
      setCountdownTime(minutesInput * 60);
      setIsCounting(true);
      setIsCountdownPaused(false);
    } else {
      setIsCountdownPaused((prev) => !prev);
      toggleTimer();
    }
  };

  const formattedTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (

    <div className="w-screen h-screen flex flex-col items-center overflow-hidden bg-zinc-900 py-10">
      <div className="flex flex-row items-center justify-center">
      <div className="flex flex-col items-center">
        <form className="rounded px-8 pb-4">
          <label className="block text-white text-center font-bold mb-2">
            Session Length (minutes)
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            type="number"
            min={1}
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
          ></input>
        </form>

        <div className="text-white text-4xl font-bold">
          Time Remaining: {formatCountdown(countdownTime)}
        </div>

        <button
          onClick={startOrPauseCountdown}
          className="bg-zinc-800 hover:bg-gray-700 text-white font-bold py-4 px-32 rounded my-5 w-[400px]"
        >
          {isCountdownPaused ? "Start" : "Pause"}
        </button>
        <button
          onClick={resetCountdown}
          className="px-16 py-3 bg-red-500 text-white rounded-lg text-lg focus:outline-none w-[400px]"
        >
          Reset Countdown Timer
        </button>
      </div>

      <div className="flex flex-col ml-40 items-center">
        <div className="text-white text-4xl font-bold mb-4">
          Time Lost: {formattedTime(time)}
        </div>
        <button
          onClick={toggleTimer}
          className="bg-zinc-800 hover:bg-gray-700 text-white font-bold py-4 px-32 rounded my-5 w-[400px]"
        >
          {isPaused ? "Resume Working" : "I Got Distracted"}
        </button>

        <button
          onClick={resetTimer}
          className="px-16 py-3 bg-red-500 text-white rounded-lg text-lg focus:outline-none w-[400px]"
        >
          Reset Time Lost
        </button>
      </div>
      </div>
      <div className="flex flex-row">
      <div className="flex flex-col items-center">
<div className="mt-20 text-white text-4xl font-bold">Daily Checklist</div>
<div className="bg-zinc-800 p-6 rounded-lg shadow-md w-[400px] mt-10">
  <h2 className="text-white text-xl font-bold mb-4">Daily Tasks</h2>
  <ul className="space-y-3">
    {["Research 10 Companies (180 mins)", "Angular GitHub Commit (60 mins)", "LinkedIn Post (60 mins)", "No GPT Interview Practice (60 mins)", "Daily Exercise (60 mins)"].map((task, index) => (
      <li key={index} className="flex items-center space-x-3">
        <input
          type="checkbox"
          id={`task-${index}`}
          className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-0"
        />
        <label htmlFor={`task-${index}`} className="text-white text-lg cursor-pointer">
          {task}
        </label>
      </li>
    ))}
  </ul>
</div>
</div>

<div className="flex flex-col ml-32">
<div className="mt-20 text-white text-4xl font-bold text-center">Custom Checklist</div>
<div className="bg-zinc-800 p-6 rounded-lg shadow-md w-[400px] mt-10">
  <h2 className="text-white text-xl font-bold mb-4">Custom Tasks</h2>

    <form onSubmit={handleAddTask} className="mb-4 flex gap-2">
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)}
      placeholder="Add a new task"
      className="w-full p-2 rounded text-black"/>
    <button type="submit" className="px-4 py-2 bg-green-500 text-white font-bold rounded">+</button>
    </form>

  <ul className="space-y-3">
    {tasks.map((task, index) => (
      <li key={index} className="flex items-center space-x-3">
        <input
          type="checkbox"
          id={`task-${index}`}
          className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-0"
        />
        <label htmlFor={`task-${index}`} className="text-white text-lg cursor-pointer">
          {task}
        </label>
      </li>
    ))}
  </ul>
  </div>
</div>
</div>
</div>
  );
}

export default App;
