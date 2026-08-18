import { useState, useEffect } from "react";

function Meme() {
  const [allMemes, setAllMemes] = useState<Array<{ url: string }>>([]);
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/30b1gx.jpg",
  });

  // Fetch memes from the API when the component mounts
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  // Function to get a random meme image
  function getMemeImage() {
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomIndex].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  // Function to handle input changes for top and bottom text
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="grid grid-cols-2 gap-x-4 p-9 font-[Karla]">
        <label className="text-lg font-bold" htmlFor="top-text">
          Top Text
        </label>
        <label className="text-lg font-bold" htmlFor="bottom-text">
          Bottom Text
        </label>

        <input
          className="border border-gray-300 rounded-md p-2 indent-1"
          type="text"
          id="top-text"
          placeholder="Ex: The looks you give when"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />

        <input
          className="border border-gray-300 rounded-md p-2 indent-1"
          type="text"
          id="bottom-text"
          placeholder="Ex: you're about to get a new meme image"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button
          className="bg-linear-to-r from-[#672280] to-[#A626D3] hover:from-[#451656] hover:to-[#861fac] text-white font-bold py-2 px-4 rounded col-span-2 cursor-pointer mt-4"
          onClick={getMemeImage}
        >
          Get a new meme image 🖼
        </button>

        <div className="col-span-2 mt-4 relative">
          <img
            src={meme.randomImage}
            alt="Meme"
            className="w-full rounded-md"
          />

          <h2 className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-3xl font-bold text-center uppercase [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,2px_2px_5px_#000] px-2">
            {meme.topText}
          </h2>

          <h2 className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-3xl font-bold text-center uppercase [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000,0_2px_0_#000,2px_0_0_#000,0_-2px_0_#000,-2px_0_0_#000,2px_2px_5px_#000] px-2">
            {meme.bottomText}
          </h2>
        </div>
      </div>
    </main>
  );
}

export default Meme;
