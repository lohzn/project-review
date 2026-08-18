import trollFace from "../assets/troll-face.png";

function Header() {
  return (
    <header className="h-16 bg-linear-to-r from-[#672280] to-[#A626D3] text-white flex flex-row gap-4 items-center p-4 font-[Karla]">
      <img src={trollFace} alt="Troll Face" className="h-full" />
      <h2 className="text-2xl font-bold">Meme Generator</h2>
      <div className="ml-auto">
        <h4 className="text-lg font-[Poppins]">React Course - Project 3</h4>
      </div>
    </header>
  );
}

export default Header;
