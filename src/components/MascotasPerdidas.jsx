import { useEffect, useState } from "react";
import { collection, query, where, getDocs} from "firebase/firestore";
import { db, auth } from "../../firebase";
import  {Mars, Venus, Dog, Cat} from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatButton from "./ChatButton";


function MascotasPerdidas() {
  const navigate= useNavigate()
  const [mascotas, setMascotas] = useState([]);
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [usuario] = useAuthState(auth);


  useEffect(() => {
    const obtenerMascotasPerdidas = async () => {
      const q = query(collection(db, "mascotas"), where("estado", "==", "perdida")); // 👈 estado en minúscula
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
    <div className="px-4 sm:px-7 py-7 max-w-4xl  mx-auto">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Mascotas Perdidas</h2>
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
        <h2 className="text-center text-gray-600">No hay mascotas perdidas.</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {mascotasFiltradas.map((mascota) => (
<div
  key={mascota.id}
  onClick={() =>
    navigate(`/ver/${mascota.id}`, { state: { origen: "adopcion" } })
  }
  className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
>
  {/* 🐾 Imagen de fondo */}
  <div
    className="h-64 sm:h-72 w-full bg-cover bg-center"
    style={{
      backgroundImage: `url(${mascota.imagen || "/img/default.jpg"})`,
    }}
  ></div>

  {/* 🖤 Degradado inferior */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

  {/* 📝 Texto superpuesto */}
  <div className="absolute bottom-0 left-0 w-full text-white p-4 flex flex-col items-start">
    <h3 className="text-2xl font-semibold mb-1 drop-shadow-md">
      {mascota.nombre}
    </h3>

    {mascota.genero && (
      <p className="flex items-center gap-2 text-lg drop-shadow-md">
        {mascota.genero === "macho" ? (
          <span className="flex items-center gap-1 text-blue-300">
            <Mars className="w-5 h-5" /> Macho
          </span>
        ) : (
          <span className="flex items-center gap-1 text-pink-300">
            <Venus className="w-5 h-5" /> Hembra
          </span>
        )}
      </p>
    )}

  </div>
{/* <div>
  {usuario ? (
    usuario.uid !== mascota.userId && (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/chat/${mascota.userId}`);
          }}
          className="absolute top-2 right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 sm:hidden transition"
        >
          <MessageCircle size={20} />
        </button>

        <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ChatButton currentUserId={usuario.uid} ownerId={mascota.userId} />
        </div>
      </>
    )
  ) : (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate("/registro");
        }}
        className="absolute top-2 right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 sm:hidden transition"
      >
        <MessageCircle size={20} />
      </button>

      <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/registro");
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm sm:text-base"
        >
          Registrate para chatear
        </button>
      </div>
    </>
  )}
  </div> */}
  
</div>


))}

</div>
      )}
    </div>
  );
}

export default MascotasPerdidas;
