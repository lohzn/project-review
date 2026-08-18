import photoGrid from "../assets/photo-grid.png";

function Hero() {
  return (
    <section className="flex flex-col p-5 space-y-4">
      <img src={photoGrid} alt="Online experiences" className="mx-auto" />
      <h1 className="hero--header mt-8 text-3xl font-bold text-left">
        Online Experiences
      </h1>
      <p className="hero--text max-w-md text-left">
        Join unique interactive activities led by one-of-a-kind hosts—all
        without leaving home.
      </p>
    </section>
  );
}

export default Hero;
