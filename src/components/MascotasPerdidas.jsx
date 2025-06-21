import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function MascotasPerdidas() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const obtenerMascotasPerdidas = async () => {
      const q = query(collection(db, "mascotas"), where("estado", "==", "perdida")); // 👈 estado en minúscula
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMascotas(lista);
    };

    obtenerMascotasPerdidas();
  }, []);

  const marcarComoEncontrada = async (id) => {
    const confirmar = window.confirm("¿Confirmás que esta mascota fue encontrada?");
    if (!confirmar) return;

    try {
      const ref = doc(db, "mascotas", id);
      await updateDoc(ref, { estado: "encontrada" });
      alert("¡Gracias! La mascota fue marcada como encontrada 🐶");
      setMascotas((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error al actualizar mascota:", error);
      alert("Ocurrió un error al marcar como encontrada.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Mascotas Perdidas</h2>

      {mascotas.length === 0 ? (
        <h2 className="text-center text-gray-600">No hay mascotas perdidas.</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotas.map((mascota) => (
            <div key={mascota.id} className="border rounded-lg shadow-md p-4 bg-white">
              <h3 className="text-xl font-bold mb-1">{mascota.nombre}</h3>
              <p className="text-gray-700 mb-1">Raza: {mascota.raza}</p>
              <p className="text-gray-700 mb-1">Color: {mascota.color}</p>
              <p className="text-gray-700 mb-1">Ciudad: {mascota.ciudad}</p>
              <p className="text-red-700 font-semibold">Estado: {mascota.estado}</p>
              <p className="text-gray-800 mt-2">📞 {mascota.telefono}</p>

              <a
                href={`https://wa.me/${mascota.telefono}?text=Hola, vi que tu mascota ${mascota.nombre} está perdida. ¿Puedo ayudarte?`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Contactar por WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MascotasPerdidas;
