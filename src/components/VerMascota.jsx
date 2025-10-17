import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useEffect, useState } from "react";
import { Mars, Venus, Heart, Phone, PawPrint } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatButton from "./ChatButton";

function VerMascota() {
  const { id } = useParams();
  const location = useLocation();
  const origen = location.state?.origen || "escanear";
  const [mascota, setMascota] = useState(null);
  const [usuario] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "mascotas", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMascota({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchData();
  }, [id]);

  if (!mascota)
    return <p className="text-center mt-10">Cargando perfil de mascota...</p>;

  let mensaje = "";
  if (origen === "adopcion") {
    mensaje = `Hola, vi que tu mascota ${mascota.nombre} está en adopción, estoy interesado.`;
  } else if (origen === "perdidas") {
    mensaje = `Hola, vi que tu mascota ${mascota.nombre} está perdida. ¿Puedo ayudarte?`;
  } else {
    mensaje = `Hola, encontré a ${mascota.nombre}. Vi su perfil en Mascotas Felices.`;
  }

  const telefono = mascota.telefono.replace(/\D/g, "");
  const linkWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(
    mensaje
  )}`;

  return (
    <div className="min-h-screen bg-[#f8ebff] p-4 max-w-md mx-auto rounded-lg shadow space-y-6">
      {/* Imagen */}
      {mascota.imagen && (
        <img
          src={mascota.imagen}
          alt={mascota.nombre}
          className="w-25 sm:w-40 h-auto mt-3 object-cover rounded-full mx-auto shadow-md"
        />
      )}

      {/* Nombre y Raza */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">{mascota.nombre}</h1>
        <p className="text-purple-600 font-medium">{mascota.raza}</p>
      </div>

      {/* Descripción */}
      <p className="text-gray-700 text-center">{mascota.descripcion}</p>

      {/* Cards Edad / Sexo / Ciudad */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg shadow">
          <p className="text-[#897399]">Edad</p>
          <p className="font-semibold">{mascota.edad}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg shadow flex flex-col items-center">
          <p className="text-[#897399]">Sexo</p>
          {mascota.genero === "macho" ? (
            <Mars className="text-blue-500 w-5 h-5" />
          ) : (
            <Venus className="text-pink-500 w-5 h-5" />
          )}
        </div>
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg shadow">
          <p className="text-[#897399]">Ciudad</p>
          <p className="font-semibold">{mascota.ciudad}</p>
        </div>
      </div>

      {/* Información adicional */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Información adicional</h2>
        <ul className="space-y-3">
          <li className="flex items-start bg-purple-50 border border-purple-200 p-3 rounded-lg shadow">
            <PawPrint className="w-6 h-auto text-purple-500 ml-1 mt-3" />
            <div className="ml-5">
              <span className="text-[#897399]">Raza</span>
              <div className="text-gray-800">{mascota.raza}</div>
            </div>
          </li>

          <li className="flex items-start bg-purple-50 border border-purple-200 p-3 rounded-lg shadow">
            <Heart className="w-6 h-auto text-purple-500 ml-1 mt-3" />
            <div className="ml-5">
              <span className="text-[#897399]">Estado</span>
              <div className="text-gray-800">{mascota.estado}</div>
            </div>
          </li>

          <li className="flex items-start bg-purple-50 border border-purple-200 p-3 rounded-lg shadow">
            <Phone className="w-6 h-auto text-purple-500 ml-1 mt-3" />
            <div className="ml-5">
              <span className="text-[#897399]">Teléfono</span>
              <div className="text-gray-800">{mascota.telefono}</div>
            </div>
          </li>
        </ul>
      </div>

      {/* Botón de Chat (solo si no es el dueño) */}
      {usuario && usuario.uid !== mascota.userId && (
        <div className="text-center">
          <ChatButton
            currentUserId={usuario.uid}
            ownerId={mascota.userId}
          />
        </div>
      )}
    </div>
  );
}

export default VerMascota;
