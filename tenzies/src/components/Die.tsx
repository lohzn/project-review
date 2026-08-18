import type { DieProps } from "../types/die";

function Die({ value, isHeld, onHold }: DieProps) {

  // Handle the click event to toggle the isHeld state of the die
  function handleClick() {
    onHold();
  }
  return (
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer ${isHeld ? "bg-[#59E391]" : "bg-white"}`}
      onClick={handleClick}
    >
      <span className="text-[28px] font-bold">{value}</span>
    </div>
  );
}
export default Die;
