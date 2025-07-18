
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import  {Mars, Venus} from "lucide-react"; 

function VerMascota() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "mascotas", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMascota(docSnap.data());
      }
    };
    fetchData();
  }, [id]);

  if (!mascota) return <p className="text-center mt-10">Cargando perfil de mascota...</p>;

  const mensaje = `Hola, encontré a ${mascota.nombre}. Vi su perfil en Mascotas Felices.`;
  const telefono = mascota.telefono.replace(/\D/g, ""); // elimina espacios o guiones

  const linkWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="min-h-screen bg-white p-4 max-w-md mx-auto rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-purple-600 text-center">{mascota.nombre}</h1>
{mascota.imagen && (
  <img
  src={mascota.imagen}
  alt={mascota.nombre}
  className="w-32 h-32 object-cover rounded-full mx-auto"
/>

)}

      <div className="space-y-2 text-center text-gray-800">
        <p>{mascota.descripcion}</p>
        {mascota.genero && (
  <p className="flex items-center gap-2">
    {" "}
    {mascota.genero === "macho" ? (
      <span className="flex items-center text-blue-600"><Mars className="w-4 h-4 mr-1" /> </span>
    ) : (
      <span className="flex items-center text-pink-600"><Venus className="w-4 h-4 mr-1" /> </span>
    )}
  </p>
)}

        <p><strong>Raza:</strong> {mascota.raza}</p>
        <p><strong>Edad:</strong> {mascota.edad}</p>
        <p><strong>Ciudad:</strong> {mascota.ciudad}</p>
        <p>{mascota.castracion}</p>
        <p><strong>{mascota.estado}</strong></p>
      </div>

      <div className="mt-6 text-center">
        <a
          href={linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}

export default VerMascota;
