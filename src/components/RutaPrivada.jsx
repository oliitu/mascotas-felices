import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function RutaPrivada({ children }) {
  const [usuario, cargando] = useAuthState(auth);
  if (cargando) return <p>Cargando...</p>;
  return usuario ? children : <Navigate to="/" />;
}

export default RutaPrivada;
