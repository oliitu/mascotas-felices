// components/Perfil.jsx
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    auth.signOut();
    navigate("/");
  };

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center text-center">
      <div className="bg-purple-100 rounded-full h-24 w-24 flex items-center justify-center text-4xl font-bold text-purple-600 mb-4">
        {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
      </div>

      <h1 className="text-2xl font-bold text-purple-600 mb-1">
        {user.displayName || "Usuario sin nombre"}
      </h1>
      <p className="text-gray-600 mb-6">{user.email}</p>

      <div className="space-y-3 w-full max-w-xs">
        <button
          onClick={() => navigate("/mis-mascotas")}
          className="w-full py-2 px-4 bg-purple-500 text-white rounded hover:bg-purple-700 transition"
        >
          Mis Mascotas
        </button>

        <button
          onClick={cerrarSesion}
          className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
