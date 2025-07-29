import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import Login from "./components/Login";
import AgregarMascota from "./components/AgregarMascota";
import RutaPrivada from "./components/RutaPrivada";
import Registro from "./components/Registro";
import PerfilMascota from "./components/PerfilMascota";
import MisMascotas from "./components/MisMascotas";
import EditarMascota from "./components/EditarMascota";
import MascotasPerdidas from "./components/MascotasPerdidas";
import Home from "./components/Inicio";
import BottomNav from "./components/BottomNav";
import Escanear from "./components/Escanear";
import Perfil from "./components/Perfil";
import VerMascota from "./components/VerMascota";
import MascotasEnAdopcion from "./components/MacotasEnAdopcion";
import TutorialPWA from "./components/TutorialPWA";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="pb-16"> {/* padding-bottom para que el contenido no tape el nav */}
        <Routes>
          <Route path="/escanear" element={<Escanear />} />
          <Route path="/tutorial" element={<TutorialPWA />} />
          <Route path="/" element={<Home />} />
          <Route path="/adopcion" element={<MascotasEnAdopcion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/mascota/:id" element={<PerfilMascota />} />
          <Route path="/ver/:id" element={<VerMascota />} />
          <Route path="/perdidas" element={<MascotasPerdidas />} />
          <Route path="/registrar-mascota" element={
            <RutaPrivada>
              <AgregarMascota />
            </RutaPrivada>
          } />
          <Route path="/mis-mascotas" element={
            <RutaPrivada>
              <MisMascotas />
            </RutaPrivada>
          } />
          <Route path="/editar/:id" element={
            <RutaPrivada>
              <EditarMascota />
            </RutaPrivada>
          } />
          <Route path="/perfil" element={
  <RutaPrivada>
    <Perfil />
  </RutaPrivada>
} />
        </Routes>

        {/* Mostrar nav excepto en login o registro 
         {window.location.pathname !== "/login" && window.location.pathname !== "/registro" && (
          
        )} */}
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
