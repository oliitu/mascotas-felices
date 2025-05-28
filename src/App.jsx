import PedidosList from "./components/PedidosList";

function App() {
  return (
    <div className="min-h-screen">
      <a href="https://bitemeshop.netlify.app/"
        
        className="hover:bg-yellow-950 bg-amber-900 text-white px-4 py-4 rounded-full "
      >
        
      </a>

      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-5 py-6">Pedidos</h1>
      <PedidosList />
    </div>
  );
}

export default App;
