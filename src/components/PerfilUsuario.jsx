import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserCircle, Flag, Ban, ArrowLeft } from "lucide-react";

export default function PerfilUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUsuario(userSnap.data());
    };
    fetchUser();
  }, [id]);

  const handleReportar = async () => {
    alert("🚨 Usuario reportado. Nuestro equipo revisará el caso.");
  };

  const handleBloquear = async () => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { bloqueado: true });
      alert("❌ Usuario bloqueado correctamente.");
    } catch (error) {
      console.error(error);
    }
  };

  if (!usuario) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">

      <div className="bg-purple-200 rounded-full border-2 border-purple-500 h-24 w-24 flex items-center justify-center mb-4">
        <UserCircle size={60} className="text-purple-600" />
      </div>

      <h1 className="text-2xl font-bold text-purple-600 mb-1">
        {usuario.name || "Usuario sin nombre"}
      </h1>
      <p className="text-gray-600 mb-6">{usuario.email}</p>

      <div className="space-y-3 w-full max-w-xs">
        <button
          onClick={handleReportar}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          <Flag size={18} /> Reportar usuario
        </button>

        <button
          onClick={handleBloquear}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <Ban size={18} /> Bloquear usuario
        </button>
      </div>
    </div>
  );
}
