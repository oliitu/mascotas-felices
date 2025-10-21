import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Perfil from "./components/MiPerfil";
import VerMascota from "./components/VerMascota";
import MascotasEnAdopcion from "./components/MacotasEnAdopcion";
import TutorialPWA from "./components/TutorialPWA";
import QueEs from "./components/QueEs";
import QuienesSomos from "./components/QuienesSomos";
import BackButton from "./components/BackButton";
import ChatList from "./components/ChatList";
import ChatPage from "./components/ChatPage";
import PerfilUsuario from "./components/PerfilUsuario";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="mt-3 z-100 fixed">
          <BackButton />
        </div>
      <div className="pb-16">
        

        <Routes>
          <Route path="/escanear" element={<Escanear />} />
          <Route path="/tutorial" element={<TutorialPWA />} />
          <Route path="/que-es" element={<QueEs />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/" element={<Home />} />
          <Route path="/adopcion" element={<MascotasEnAdopcion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/mascota/:id" element={<PerfilMascota />} />
          <Route path="/ver/:id" element={<VerMascota />} />
          <Route path="/perdidas" element={<MascotasPerdidas />} />

          <Route
            path="/registrar-mascota"
            element={
              <RutaPrivada>
                <AgregarMascota />
              </RutaPrivada>
            }
          />
          <Route
            path="/mis-mascotas"
            element={
              <RutaPrivada>
                <MisMascotas />
              </RutaPrivada>
            }
          />
          <Route
            path="/editar/:id"
            element={
              <RutaPrivada>
                <EditarMascota />
              </RutaPrivada>
            }
          />
          <Route
            path="/miperfil"
            element={
              <RutaPrivada>
                <Perfil />
              </RutaPrivada>
            }
          />

          {/* ✅ Pasamos el user.uid a los componentes del chat */}
          <Route
            path="/chats"
            element={
              <RutaPrivada>
                <ChatList currentUserId={user?.uid} />
              </RutaPrivada>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <RutaPrivada>
                <ChatPage currentUserId={user?.uid} />
              </RutaPrivada>
            }
          />
          <Route path="/perfil/:id" element={<PerfilUsuario />} />
        </Routes>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
