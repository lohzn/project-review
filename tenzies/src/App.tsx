import "./App.css";
import Die from "./components/Die";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useStopwatch } from "react-timer-hook";

function App() {
  const [dice, setDice] = useState(() => resetDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: false,
  });
  const [timeTaken, setTimeTaken] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  // Check if all dice are held and have the same value
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSame = dice.every((die) => die.value === dice[0].value);

    if (allHeld && allSame) {
      pause();
      setTenzies(true);
      setTimeTaken({ seconds, minutes, hours });
    }
  }, [dice, pause, seconds, minutes, hours]);

  // Generate a new die with random value and unique id
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // Reset the dice to a new set of 10 random dice
  function resetDice() {
    const newDice = [];
    newDice.push(...Array.from({ length: 10 }, () => generateNewDie()));
    return newDice;
  }

  // Roll the dice, updating the state and starting the timer if necessary
  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(resetDice());
      setRollCount(0);
      setTimerStarted(false);
      setTimeTaken({ seconds: 0, minutes: 0, hours: 0 });
      reset();
      return;
    }

    setRollCount((prev) => prev + 1);

    if (!timerStarted) {
      start();
      setTimerStarted(true);
    }

    setDice((prevDice) =>
      prevDice.map((die) =>
        die.isHeld
          ? die
          : {
              ...generateNewDie(),
            },
      ),
    );
  }

  // Toggle the isHeld property of a die when it is clicked
  function holdDie(id: string) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-[#0B2434] flex items-center justify-center p-4">
      <div className="flex-col h-screen w-[80%] p-4 rounded-[10px] bg-[#F5F5F5] shadow-lg flex items-center justify-evenly font-[Karla]">
        <h1 className="title font-[Inter] tracking-[0.25em] text-4xl font-extrabold text-[#0B2434] uppercase">
          Tenzies
        </h1>
        <p className="instructions text-[#4A4A4A] text-center">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        {tenzies && <Confetti />}
        {tenzies ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-[#0B2434] text-xl font-bold uppercase">Tenzi!</p>
            <p className="text-[#4A4A4A]">You rolled {rollCount} times.</p>
            <p className="text-[#4A4A4A]">
              Time taken: {timeTaken.hours}h {timeTaken.minutes}m{" "}
              {timeTaken.seconds}s
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-5 grid-rows-2 gap-6">
            {dice.map((die) => (
              <Die
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                onHold={() => holdDie(die.id)}
              />
            ))}
          </section>
        )}
        <button
          className="w-25 h-9 mt-6 bg-[#5035FF] text-white rounded-md active:inset-shadow-[5px_5px_10px_-3px_rgba(0,0,0,0.5)] focus:outline-0 focus:cursor-pointer"
          onClick={() => rollDice()}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
