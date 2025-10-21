import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { UserCircle, Flag, Ban, ArrowLeft } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";

export default function PerfilUsuario() {
  const { id } = useParams(); // ID del usuario visitado
  const [usuario, setUsuario] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Detectar usuario logueado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsub();
  }, []);

  // Traer datos del usuario del perfil
  useEffect(() => {
    const fetchUser = async () => {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) setUsuario(userSnap.data());
    };
    fetchUser();
  }, [id]);

  // 📌 REPORTAR USUARIO
  const handleReportar = async () => {
    if (!currentUser || !usuario) return;

    try {
      const reportesRef = collection(db, "reportes");
      await addDoc(reportesRef, {
        reportadoId: id,
        reportadoNombre: usuario.name || "Sin nombre",
        reportadoEmail: usuario.email,
        reportadoFecha: serverTimestamp(),
        reportadoPor: currentUser.uid,
        reportadoPorEmail: currentUser.email,
      });

      alert("🚨 Usuario reportado correctamente. Nuestro equipo revisará el caso.");
    } catch (error) {
      console.error("Error al reportar:", error);
      alert("Error al reportar usuario.");
    }
  };

  // 🚫 BLOQUEAR USUARIO
  const handleBloquear = async () => {
    if (!currentUser) return;

    try {
      const bloqueosRef = doc(db, "bloqueos", currentUser.uid);
      const bloqueosSnap = await getDoc(bloqueosRef);

      // Si ya tiene bloqueos previos, agregamos este usuario
      if (bloqueosSnap.exists()) {
        const data = bloqueosSnap.data();
        const nuevosBloqueos = [...(data.bloqueados || []), id];
        await updateDoc(bloqueosRef, { bloqueados: nuevosBloqueos });
      } else {
        // Si no tiene documento, lo creamos
        await setDoc(bloqueosRef, {
          bloqueados: [id],
        });
      }

      alert("❌ Usuario bloqueado correctamente. No recibirás más mensajes de él.");
    } catch (error) {
      console.error("Error al bloquear usuario:", error);
      alert("Error al bloquear usuario.");
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
{/* 
        <button
          onClick={handleBloquear}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          <Ban size={18} /> Bloquear usuario
        </button> */}
      </div>
    </div>
  );
}
