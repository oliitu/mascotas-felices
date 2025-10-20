import { useEffect, useState } from "react";
import { collection, query, where, getDocs} from "firebase/firestore";
import { db, auth } from "../../firebase";
import  {Mars, Venus, Dog, Cat} from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import ChatButton from "./ChatButton";
import { useAuthState } from "react-firebase-hooks/auth";

function MascotasEnAdopcion() {
  const navigate= useNavigate()
  const [mascotas, setMascotas] = useState([]);
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [usuario] = useAuthState(auth);

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
    <div className="px-4 sm:px-7 py-7 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Mascotas en Adopción</h2>
   <div className="mb-4 text-center">
  <label className="block mb-2 font-semibold">Filtrar por especie:</label>
  <div className="flex justify-center gap-4">
    {/* Botón Perro */}
    <button
      onClick={() => setFiltroEspecie(filtroEspecie === "perro" ? "" : "perro")}
      className={`p-3 rounded-full border-2 transition ${
        filtroEspecie === "perro"
          ? "bg-purple-200 border-purple-500 text-purple-700"
          : "bg-white border-gray-300 hover:bg-gray-100"
      }`}
    >
      <Dog size={28} />
    </button>

    {/* Botón Gato */}
    <button
      onClick={() => setFiltroEspecie(filtroEspecie === "gato" ? "" : "gato")}
      className={`p-3 rounded-full border-2 transition ${
        filtroEspecie === "gato"
          ? "bg-purple-200 border-purple-500 text-purple-700"
          : "bg-white border-gray-300 hover:bg-gray-100"
      }`}
    >
      <Cat size={28} />
    </button>
  </div>
</div>

      {mascotas.length === 0 ? (
        <h2 className="text-center text-gray-600">No hay mascotas en adopción.</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {mascotasFiltradas.map((mascota) => (
  <div
    key={mascota.id}
    onClick={() => navigate(`/ver/${mascota.id}`, { state: { origen: "adopcion" } })}
    className="border border-gray-300 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow flex flex-col items-center text-center"
  >
    <h3 className="text-2xl font-semibold mb-3">{mascota.nombre}</h3>

    {mascota.imagen && (
      <img
        src={mascota.imagen}
        alt={mascota.nombre}
        className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mb-4"
      />
    )}

    {mascota.genero && (
      <p className="flex items-center justify-center gap-2 mb-2 text-lg">
        {mascota.genero === "macho" ? (
          <span className="text-blue-600 flex items-center gap-1">
            <Mars className="w-5 h-5" /> Macho
          </span>
        ) : (
          <span className="text-pink-600 flex items-center gap-1">
            <Venus className="w-5 h-5" /> Hembra
          </span>
        )}
      </p>
    )}

    <p className="text-gray-700 text-base mb-1">{mascota.ciudad}</p>

    {mascota.telefono && (
      <p className="text-gray-800 text-base mt-2 mb-4">📞 {mascota.telefono}</p>
    )}

    {/* 👇 Mostrar según el estado del usuario */}
    <div className="text-center">
      {usuario ? (
        usuario.uid !== mascota.userId && (
          <ChatButton currentUserId={usuario.uid} ownerId={mascota.userId} />
        )
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation(); // evita abrir el perfil
            navigate("/registro");
          }}
          className="flex items-center justify-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Registrate para chatear
        </button>
      )}
    </div>
  </div>
))}

</div>

      )}
    </div>
  );
}

export default MascotasEnAdopcion;
