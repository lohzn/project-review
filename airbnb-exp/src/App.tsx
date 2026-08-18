import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { data } from "./data/data";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <section className="cards-list flex flex-row overflow-x-auto gap-5 p-4">
        {data.map((item: any) => (
          <Card key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}

export default App;
