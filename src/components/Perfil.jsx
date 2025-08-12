import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import Toast from "./Toast"; // importa tu toast

export default function Perfil() {
  const [user] = useAuthState(auth);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [toastMsg, setToastMsg] = useState(""); // estado para mensaje
  const navigate = useNavigate();

  const mostrarToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const cerrarSesion = () => {
    auth.signOut();
    navigate("/");
  };

  const cambiarNombre = async () => {
    if (!nuevoNombre.trim()) return mostrarToast("El nombre no puede estar vacío");
    try {
      await updateProfile(user, { displayName: nuevoNombre });
      mostrarToast("Nombre actualizado ✅");
      setNuevoNombre("");
    } catch (error) {
      console.error(error);
      mostrarToast("Error al actualizar el nombre");
    }
  };

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center items-center text-center">
      <Toast message={toastMsg} /> {/* componente toast */}

      <div className="bg-purple-200 rounded-full border-2 border-purple-500 h-24 w-24 flex items-center justify-center text-4xl font-bold text-purple-600 mb-4">
        <PawPrint size={42} />
      </div>

      <h1 className="text-2xl font-bold text-purple-600 mb-1">
        {user.displayName || "Usuario sin nombre"}
      </h1>
      <p className="text-gray-600 mb-6">{user.email}</p>

      {/* Cambiar nombre */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-xs items-center justify-center">
        <input
          type="text"
          placeholder="Cambiar nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          className="border border-gray-400 bg-white p-2 w-40"
        />
        <button
          onClick={cambiarNombre}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Guardar
        </button>
      </div>

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
