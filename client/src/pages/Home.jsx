import Categories from "../components/Categories";
import PartsList from "../components/PartsList";

const Home = () => {
  return (
    <section className="container mt-4 p-5 bg-dark border border-4 rounded-5 shadow text-white" data-bs-theme="dark">
      <div className="container">
        <h1 className="fs-1">Build Your PC</h1>
        <Categories />
        <PartsList />
      </div>
    </section>
  );
};

export default Home;