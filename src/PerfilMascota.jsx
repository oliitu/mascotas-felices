import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PerfilMascota from "./components/PerfilMascota";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl lg:text-5xl font-bold text-center mt-5 py-6">
          Mascota
        </h1>

        <Routes>
          <Route path="/mascota/:id" element={<PerfilMascota />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
