import { useEffect, useState } from "react";
import { collection, query, where, getDocs} from "firebase/firestore";
import { db } from "../../firebase";
import  {Mars, Venus} from "lucide-react"; 

function MascotasEnAdopcion() {
  const [mascotas, setMascotas] = useState([]);
  const [filtroEspecie, setFiltroEspecie] = useState("");

  useEffect(() => {
    const obtenerMascotasPerdidas = async () => {
      const q = query(collection(db, "mascotas"), where("estado", "==", "en adopcion")); // 👈 estado en minúscula
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMascotas(lista);
    };

    obtenerMascotasPerdidas();
  }, []);
const mascotasFiltradas = filtroEspecie
  ? mascotas.filter((m) => m.especie === filtroEspecie)
  : mascotas;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Mascotas En Adopción</h2>
<div className="mb-4 text-center">
  <label className="mr-2 font-semibold">Filtrar por especie:</label>
  <select
    value={filtroEspecie}
    onChange={(e) => setFiltroEspecie(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">Todas</option>
    <option value="perro">Perro</option>
    <option value="gato">Gato</option>
  </select>
</div>

      {mascotas.length === 0 ? (
        <h2 className="text-center text-gray-600">No hay mascotas en adopción.</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mascotasFiltradas.map((mascota) => (
            
            <div key={mascota.id} className="border rounded-lg shadow-md p-4 bg-white">
              <h3 className="text-xl font-bold mb-1">{mascota.nombre}</h3>
              {mascota.imagen && (
  <img
  src={mascota.imagen}
  alt={mascota.nombre}
  className="w-20 sm:w-32 h-auto object-cover rounded-full mx-auto"
/>

)}            {mascota.genero && (
  <p className="flex items-center gap-2">
    {" "}
    {mascota.genero === "macho" ? (
      <span className="flex items-center text-blue-600"><Mars className="w-4 h-4 mr-1" /> </span>
    ) : (
      <span className="flex items-center text-pink-600"><Venus className="w-4 h-4 mr-1" /> </span>
    )}
  </p>
)}

              <p className="text-gray-700 text-sm sm:text-base mb-1">{mascota.raza}</p>
              <p className="text-gray-700 text-sm sm:text-base mb-1">{mascota.castracion}</p>
              <p className="text-gray-700 text-sm sm:text-base mb-1">Ciudad: {mascota.ciudad}</p>
              <p className="text-gray-800 text-sm sm:text-base mt-2">📞 {mascota.telefono}</p>

              <a
                href={`https://wa.me/${mascota.telefono}?text=Hola, vi que tu mascota ${mascota.nombre} está en adopción, estoy interesado.`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center mt-3 text-xs sm:text-base bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
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

export default MascotasEnAdopcion;
